const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/entregaFinal2db';

const initMongoDB = async () => {
    try {
        console.log('Conectando a la db');
        await mongoose.connect(connectionString);
        console.log('Conexión realizada con exito');
    } catch (error) {
        console.log(`ERROR => ${error}`);
        return error;
    }
};

    module.exports = { initMongoDB }