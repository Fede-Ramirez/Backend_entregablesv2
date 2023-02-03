const express = require('express');
const minimist = require('minimist');
const cluster = require('cluster');
const os = require('os');

const app = express();

const arguments = minimist(process.argv.slice(2));
const port = arguments.puerto || 8080;

const clusterMode = arguments.cluster;
const numCPUs = os.cpus().length;

if (clusterMode && cluster.isPrimary) {
    console.log('Ejecutando modo cluster');
    console.log(`PID MASTER ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died at ${Date()}`);
        cluster.fork();
    });
} else {

app.get('/', (req, res) => {
    try {
        console.log('Estás en el endpoint /');
        res.json({
            pid: process.pid,
            msg: `Hola usuario desde puerto ${port}`,
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message, 
            stack: error.stack 
        });
    }
});

app.get('/info', (req, res) => {
    try {
        const infoObject = {
            actualDirectory: process.cwd(),
            processId: process.pid,
            nodeVersion: process.version,
            processTitle: process.title,
            operatingSystem: process.platform,
            memoryUsage: process.memoryUsage(),
        };

        console.log(infoObject);
        res.status(200).json({
            data: infoObject,
        });
    } catch (error) {
        res.status(500).json({ error: error.message, stack: error.stack });
    }
});

    app.listen(port, () =>
        console.log(
        `Servidor express escuchando en el puerto ${port} - PID WORKER ${process.pid}`
        )
    );
}