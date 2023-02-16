const { saveProducts, getAllProducts } = require("../persistence/persistence.js");

async function saveProductsService(items){
    const products = await saveProducts(items)
    return products;
};

async function getAllProductsService() {
    const products = await getAllProducts();
    return products;
};

module.exports = {
    saveProductsService,
    getAllProductsService
};