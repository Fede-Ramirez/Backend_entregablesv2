const { saveCartsService, getAllCartsService, deleteCartService } = require("../services/cartsServices");
const logger = require('../services/log4jsConfig');

const saveCartsController = async (ctx, next) => {
    const data = ctx.request.body;
    try {
        const carts = await saveCartsService(data);
        ctx.body = {
            status: 'success',
            data: carts
        };
        ctx.status = 201;
    } catch (error) {
        next(error);
    }
};

const getAllCartsController = async (ctx, next) => {
    try {
        const carts = await getAllCartsService();
        ctx.body = {
            status: 'success',
            data: carts
        };
        ctx.status = 200;
    } catch (error) {
        logger.error(error);
    }
};

const deleteCartController = async (ctx, next) => {
    try {
        const { id } = ctx.params;
        const cartDeleted = await deleteCartService(id);

        ctx.body = {
            status: 'success',
            message: `Cart with id ${id} deleted successfully`,
            data: cartDeleted
        };
        ctx.status = 200;
    } catch (error) {
        next(error);
    }
};

module.exports = {
    saveCartsController,
    getAllCartsController,
    deleteCartController
}
