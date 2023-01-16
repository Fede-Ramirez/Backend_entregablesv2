const cluster = require('cluster');
const os = require('os')
const server = require('./services/server');
const minimist = require('minimist');

const arguments = minimist(process.argv.slice(2));
const port = arguments.puerto;

const numberCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`NUMERO DE CPUS ===> ${numberCPUs}`);
    console.log(`PID MASTER ${process.pid}`);

    for (let i = 0; i < numberCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code) => {
        console.log(`Worker ${worker.process.pid} died with code ${code} at ${Date()}`);
        cluster.fork();
    });
} else {
    server.listen(port, () =>
    console.log(`Servidor express escuchando en el puerto ${port} - PID WORKER ${process.pid}`)
);
}

module.exports = port;
