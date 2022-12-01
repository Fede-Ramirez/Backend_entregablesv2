const server = require('./services/server');
const { initMongoDB } = require('./services/database');

const init = async () => {
    await initMongoDB();
    const port = 8080;
    server.listen(port, () => {
        console.log(`Servidor escuchando en el puerto ${port}`);
    });
}

init();
