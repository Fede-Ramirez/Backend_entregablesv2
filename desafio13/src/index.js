const cluster = require('cluster');
const os = require('os')
const server = require('./services/server');

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
    const port = 8080;

    server.listen(port, () =>
        console.log(`Servidor express escuchando en el puerto ${port} - PID WORKER ${process.pid}`)
    );
}
