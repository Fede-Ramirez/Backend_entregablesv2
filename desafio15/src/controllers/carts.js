const { saveCartsService, getAllCartsService } = require("../services/cartsServices");
const logger = require('../services/log4jsConfig');

const saveCartsController = async (req, res) => {
    const { body } = req;
    try {
        const carts = await saveCartsService(body);
        res.json(carts);
    } catch (error) {
        logger.error(error);
    }
}

const getAllCartsController = async (req, res) => {
    try {
        const carts = await getAllCartsService();
        res.json(carts);
    } catch (error) {
        logger.error(error);
    }
}

module.exports = {
    saveCartsController,
    getAllCartsController
}
