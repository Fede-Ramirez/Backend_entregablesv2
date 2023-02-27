const axios = require('axios');
const logger = require('../../services/log4jsConfig');

const updateData = {
    name: 'salmones dorados',
    price: 5700,
    stock: 100,
    codebar: "ceno23yr3y4r928"
};

const url = "http://localhost:8080/api/products/2";

const axiosPutFunction = async () => {
    try {
        const response = await axios.put(url, updateData);
        logger.info(response.data);
    } catch (error) {
        logger.error(error.message);
    }
};

module.exports = { axiosPutFunction };