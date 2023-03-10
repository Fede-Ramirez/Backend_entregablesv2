const { File } = require("./filesystem/filesystem");
const { Memory } = require("./memory/memory");
const { MongoDB } = require("./mongodb/mongodb");
const productsSchema = require("./mongodb/schemas/productsSchema");
const cartsSchema = require("./mongodb/schemas/cartsSchema");
const { initMongoDB } = require("./mongodb/mongodb");
const logger = require('../services/log4jsConfig');

let productsPersistence;
let cartsPersistence;
let argv = process.argv[2];

switch(argv) {
    case 'file':
        productsPersistence = new File('./src/persistence/filesystem/products.json');
        cartsPersistence = new File('./src/persistence/filesystem/carts.json');
        logger.info(argv);
        break;
    case 'mongo':
        initMongoDB();
        productsPersistence = new MongoDB('products', productsSchema);
        cartsPersistence = new MongoDB('carts', cartsSchema);
        logger.info(argv);
        break;
    default:
        productsPersistence = new Memory();
        cartsPersistence = new Memory();
        break;
};

async function saveProducts(obj) {
    return await productsPersistence.save(obj);
};

async function getAllProducts() {
    return await productsPersistence.getAll();
};

async function updateProduct(id, title, price, stock) {
    return await productsPersistence.update(id, title, price, stock);
};

async function deleteProduct(id) {
    return await productsPersistence.delete(id);
};

async function saveCarts(obj) {
    return await cartsPersistence.save(obj);
};

async function getAllCarts() {
    return await cartsPersistence.getAll();
};

async function deleteCart(id) {
    return await cartsPersistence.delete(id);
};

module.exports = {
    saveProducts,
    getAllProducts,
    updateProduct,
    deleteProduct,
    saveCarts,
    getAllCarts,
    deleteCart
}