const { saveProductsService, getAllProductsService, updateProductService, deleteProductService } = require("../../services/productsServices");

const saveProductsController = async ({data}) => {
    const newProduct = { ...data };
    const newProducts = await saveProductsService(newProduct);
    return newProducts;
};

const getAllProductsController = async () => {
    const products = await getAllProductsService();
    return products;
};

const updateProductController = async (id, name, price, stock, codebar) => {
    const data = {
        name,
        price,
        stock,
        codebar
    }

    const productUpdated = await updateProductService(id, data);
    return productUpdated;
};

const deleteProductController = async ({id}) => {
        const product = await deleteProductService(id);
        return true;
};

module.exports = {
    saveProductsController,
    getAllProductsController,
    updateProductController,
    deleteProductController
}