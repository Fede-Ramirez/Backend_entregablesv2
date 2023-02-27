const axios = require('axios');
const logger = require('../../../src/services/log4jsConfig');

const newProduct = {
    id: 4,
    name: 'rabas',
    price: 4000,
    stock: 100,
    codebar: 'amdnforeij843u82'
};

const url = 'http://localhost:8080/api/products/new-products';

const axiosPostFunction = async () => {
    try {
        const response = await axios.post(url, newProduct);
        logger.info(response.data);
    } catch (error) {
        logger.error(error.message);
    }
};

module.exports = { axiosPostFunction }; 