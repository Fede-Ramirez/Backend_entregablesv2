const config = require('./config/config');
const { connectDatabase } = require('./services/database');
const logger = require('./services/log4jsConfig');
const server = require('./services/server');

const { PORT } = config;

const initialize = async () => {
    await connectDatabase();
    logger.info('db conectada con éxito')
    const server = server.listen(PORT, () => {
        logger.info(`Servidor escuchando en el puerto ${PORT}`);
    });

    server.on('error', (error) => logger.error(`Error en servidor: ${error}`));
};

initialize();