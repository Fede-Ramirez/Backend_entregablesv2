const mongoose = require('mongoose');
const config = require('../../config/config');
const logger = require('../../services/log4jsConfig');

const initMongoDB = async () => {
    try {
        logger.info('Conectando a la db');
        await mongoose.connect(config.MONGO_ATLAS_URL);
        logger.info('Conexión realizada con exito');
    } catch (error) {
        logger.error(`ERROR => ${error}`);
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
            logger.error(error);
        }
    }

    async getAll() {
        try {
            const docs = await this.collection.find({});
            return docs;
        } catch (error) {
            logger.error(error);
        }
    }
}

module.exports = { 
    initMongoDB,
    MongoDB 
};