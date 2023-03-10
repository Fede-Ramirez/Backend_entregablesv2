const mongoose = require('mongoose');
const config = require('../../config/config');
const logger = require('../../services/log4jsConfig');

mongoose.set('strictQuery', true);

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
    };

    async save(doc) {
        try {
            const document = await this.collection.create(doc);
            return document;
        } catch (error) {
            logger.error(error);
        };
    }

    async getAll() {
        try {
            const docs = await this.collection.find({});
            return docs;
        } catch (error) {
            logger.error(error);
        };
    }

    async update(id, title, price, stock) {
        try {
            let product = await this.collection.findOne({ id: id });

            const docUpdated = await this.collection.findByIdAndUpdate(
                product._id,
                { title, price, stock },
                { new: true }
            );
            return docUpdated;
        } catch (error) {
            logger.error(error.message);
        };
    }

    async delete(id) {
        try {
            const doc = await this.collection.findOne({ id: id });
            await this.collection.findByIdAndDelete(doc._id);
            return doc;
        } catch (error) {
            logger.error(error.message);
        };
    }
}

module.exports = { 
    initMongoDB,
    MongoDB 
};