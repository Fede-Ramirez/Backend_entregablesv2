const axios = require('axios');
const logger = require('../../services/log4jsConfig');

const url = "http://localhost:8080/api/products/3";

const axiosDeleteFunction = async () => {
    try {
        const response = await axios.delete(url);
        logger.info(response.data);
    } catch (error) {
        logger.error(error);
    }
};

module.exports = { axiosDeleteFunction };