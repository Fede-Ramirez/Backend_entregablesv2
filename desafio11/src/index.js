const { connectDb } = require('./services/db');
const server = require('./services/server');

const port = 8080;

const init = async () => {
    await connectDb();
    server.listen(port, () => {
        console.log(`Servidor escuchando en el puerto ${port}`);
    });

    server.on('error', (error) => console.log(`Error en servidor: ${error}`));
};

init();
