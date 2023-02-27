const { saveProductsService, getAllProductsService, updateProductService, deleteProductService } = require("../services/productsServices");
const logger = require('../services/log4jsConfig');

const saveProductsController = async (req, res) => {
    const { body } = req;
    try {
        const products = await saveProductsService(body);
        res.json(products);
    } catch (error) {
        logger.error(error);
    }
};

const getAllProductsController = async (req, res) => {
    try {
        const products = await getAllProductsService();
        res.json(products);
    } catch (error) {
        logger.error(error);
    }
};

const updateProductController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, price, stock, codebar } = req.body;

        const productUpdated = await updateProductService(id, name, price, stock, codebar);
        res.json(productUpdated);
        } catch (error) {
            logger.error(error);
        }
};

const deleteProductController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const product = await deleteProductService(id);
        res.json(product);
    } catch (error) {
        logger.error(error);
    }
};

module.exports = {
    saveProductsController,
    getAllProductsController,
    updateProductController,
    deleteProductController
}
