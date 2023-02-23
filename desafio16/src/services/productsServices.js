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

module.exports = {
    saveProductsService,
    getAllProductsService
};