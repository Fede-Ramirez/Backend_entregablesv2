const server = require('./services/server');
const initWsServer = require('./services/socket');
const { initProductsDatabase, initMessagesDatabase } = require('./services/database');

const init = async () => {
    await initProductsDatabase();
    await initMessagesDatabase();
    await initWsServer(server);
    const port = 8080;

    server.listen(port, () => {
        console.log(`servidor escuchando en el puerto ${port}`);
    })
}

init();
