const server = require('./services/server');
const logger = require('./services/log4jsConfig');
const port = 8080;

server.listen(port, () => {
    logger.info(`Servidor escuchando en el puerto ${port}`);
});
