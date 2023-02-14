const { CategoryModel } = require('../models');
const { ProductsAPI, ApiError, ErrorStatus } = require('./index');

const find = (id) => {
    if (id) {
        return CategoryModel.findById(id);
    };

    return CategoryModel.find();
};

const create = (newCategory) => {
    CategoryModel.create(newCategory);
};

const update = (id, data) =>
    CategoryModel.findByIdAndUpdate(id, data, {
        new: true,
});

const remove = async (id) => {
    const productsWithCategory = await ProductsAPI.findByCategory(id);

    if (productsWithCategory.length > 0) {
        throw new ApiError(
        'No se puede eliminar la categoría porque hay productos dentro de la misma',
        ErrorStatus.BadRequest,
        );
    };

    CategoryModel.findByIdAndDelete(id);
};

module.exports = {
    find,
    create,
    update,
    remove,
};
