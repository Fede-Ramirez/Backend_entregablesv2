const { saveProductsService, getAllProductsService, updateProductService, deleteProductService } = require("../services/productsServices");

const saveProductsController = async (ctx, next) => {
    const data = ctx.request.body;
    try {
        const products = await saveProductsService(data);
        ctx.body = {
            status: 'success',
            data: products
        };
        ctx.status = 201;
    } catch (error) {
        next(error);
    }
};

const getAllProductsController = async (ctx, next) => {
    try {
        const products = await getAllProductsService();
        ctx.body = {
            status: 'success',
            data: products
        };
        ctx.status = 200;
    } catch (error) {
        next(error);
    }
};

const updateProductController = async (ctx, next) => {
    try {
        const { id } = ctx.params;
    const { title, price, stock } = ctx.request.body;

    const newData = await updateProductService(
        id,
        title,
        price,
        stock
    );

    ctx.body = {
        status: 'success',
        data: newData
    };
    ctx.status = 200;
    } catch (error) {
        next(error);
    }
};

const deleteProductController = async (ctx, next) => {
    try {
        const { id } = ctx.params;
        const productDeleted = await deleteProductService(id);

        ctx.body = {
            status: 'success',
            message: `Product with id ${id} deleted successfully`,
            data: productDeleted
        };
        ctx.status = 200;
    } catch (error) {
        next(error);
    }
};

module.exports = {
    saveProductsController,
    getAllProductsController,
    updateProductController,
    deleteProductController
}
