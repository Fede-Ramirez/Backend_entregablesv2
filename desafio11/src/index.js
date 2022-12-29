const { connectDb } = require('./services/db');
const server = require('./services/server');
const port = require('./services/minimist');

const init = async () => {
    await connectDb();
    server.listen(port.puerto, () => {
        console.log(`Servidor escuchando en el puerto ${port.puerto}`);
    });

    server.on('error', (error) => console.log(`Error en servidor: ${error}`));
};

init();
