const { saveProductsService, getAllProductsService } = require("../services/productsServices");
const logger = require('../services/log4jsConfig');

const saveProductsController = async (req, res) => {
    const { body } = req;
    try {
        const products = await saveProductsService(body);
        res.json(products);
    } catch (error) {
        logger.error(error);
    }
}

const getAllProductsController = async (req, res) => {
    try {
        const products = await getAllProductsService();
        res.json(products);
    } catch (error) {
        logger.error(error);
    }
}

module.exports = {
    saveProductsController,
    getAllProductsController
}
