const axios = require('axios');
const logger = require('../../../src/services/log4jsConfig');

const axiosGetFunction = async() => {
    try {
        const response = await axios.get('http://localhost:8080/api/products/available-products')
        logger.info(response.data); 
    } catch (error) {
        logger.error(error.message);
    }
};

module.exports = { axiosGetFunction };