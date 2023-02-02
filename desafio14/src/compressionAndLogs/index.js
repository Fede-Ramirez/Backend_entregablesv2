const cluster = require('cluster');
const os = require('os')
const server = require('./services/server');
const logger = require('./services/log4jsConfig');

const numberCPUs = os.cpus().length;

if (cluster.isPrimary) {
    logger.info(`NUMERO DE CPUS ===> ${numberCPUs}`);
    logger.info(`PID MASTER ${process.pid}`);

    for (let i = 0; i < numberCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code) => {
        logger.warn(`Worker ${worker.process.pid} died with code ${code} at ${Date()}`);
        cluster.fork();
    });
} else {

    const port = 8080;

    server.listen(port, () =>
    logger.info(`Servidor express escuchando en el puerto ${port} - PID WORKER ${process.pid}`)
);
}