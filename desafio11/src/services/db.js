const mongoose = require('mongoose');
const config = require('../config');

const connectDb = () => {
    return mongoose.connect(config.MONGO_ATLAS_URL, { useNewUrlParser: true });
};

module.exports = {
    connectDb
};