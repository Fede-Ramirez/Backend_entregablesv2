const mongoose = require('mongoose');
const config = require('../../config/config');

const initMongoDB = async () => {
    try {
        console.log('Conectando a la db');
        await mongoose.connect(config.MONGO_ATLAS_URL);
        console.log('Conexión realizada con exito');
    } catch (error) {
        console.log(`ERROR => ${error}`);
        return error;
    }
};

class MongoDB {
    constructor(collection, schema){
        this.collection = mongoose.model(collection, schema);
    }

    async save(doc) {
        try {
            const document = await this.collection.create(doc);
            return document;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const docs = await this.collection.find({});
            return docs;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { 
    initMongoDB,
    MongoDB 
};