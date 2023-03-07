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

const updateProductController = async (updateData) => {
    const { data, id } = updateData; 
    const { name, price, stock,codebar } = data;
    console.log('la data es',data);
    const productUpdated = await updateProductService(id, name, price, stock, codebar);

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