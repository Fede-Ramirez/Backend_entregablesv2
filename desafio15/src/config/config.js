require('dotenv').config()

module.exports = {
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_SRV || 'mongodb://localhost:27017/desafio15',
};