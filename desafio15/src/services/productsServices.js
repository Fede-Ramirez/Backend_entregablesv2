const { saveProducts, getAllProducts, updateProduct, deleteProduct } = require("../persistence/persistence.js");

async function saveProductsService(items){
    const products = await saveProducts(items)
    return products;
};

async function getAllProductsService() {
    const products = await getAllProducts();
    return products;
};

async function updateProductService(id, title, price, stock) {
    const productUpdated = await updateProduct(id, title, price, stock);
    return productUpdated;
};

async function deleteProductService(id) {
    const productDeleted = await deleteProduct(id);
    return productDeleted;
}

module.exports = {
    saveProductsService,
    getAllProductsService,
    updateProductService,
    deleteProductService
};