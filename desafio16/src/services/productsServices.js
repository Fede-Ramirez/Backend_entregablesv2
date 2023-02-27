const { ProductsRepository } = require("../persistence/repository/productsRepository");

const productsRepository = new ProductsRepository();

async function saveProductsService(items){
    const products = await productsRepository.save(items)
    return products;
};

async function getAllProductsService() {
    const products = await productsRepository.getAll();
    return products;
};

async function updateProductService(id, name, price, stock, codebar) {
    const productUpdated = await productsRepository.updateProduct(id, name, price, stock, codebar);
    return productUpdated;
};

async function deleteProductService(id) {
    const productDeleted = await productsRepository.deleteProduct(id);
    return productDeleted;
};

module.exports = {
    saveProductsService,
    getAllProductsService,
    updateProductService,
    deleteProductService
};