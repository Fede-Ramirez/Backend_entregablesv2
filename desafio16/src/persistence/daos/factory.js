const { DaoFile } = require("./dao-filesystem/filesystem");
const { DaoMemory } = require("./dao-memory/memory");
const { DaoMongoDB } = require("./dao-mongodb/mongodb");
const productsSchema = require("./dao-mongodb/schemas/productsSchema");
const cartsSchema = require("./dao-mongodb/schemas/cartsSchema");
const { initMongoDB } = require("./dao-mongodb/mongodb");
const logger = require('../../services/log4jsConfig');
const { axiosUtilities } = require('../../http-client/axiosTests');

let productsDao;
let cartsDao;
let argv = process.argv[2];

switch(argv) {
    case 'file':
        productsDao = new DaoFile('./src/persistence/daos/dao-filesystem/products.json');
        cartsDao = new DaoFile('./src/persistence/daos/dao-filesystem/carts.json');
        logger.info(argv);
        break;
    case 'mongo':
        initMongoDB();
        productsDao = new DaoMongoDB('products', productsSchema);
        cartsDao = new DaoMongoDB('carts', cartsSchema);
        logger.info(argv);
        //axiosUtilities();
        break;
    default:
        productsDao = new DaoMemory();
        cartsDao = new DaoMemory();
        break;
};

async function saveProducts(obj) {
    return await productsDao.save(obj);
};

async function getAllProducts() {
    return await productsDao.getAll();
};

async function updateProduct(id, name, price, stock, codebar) {
    return await productsDao.update(id, name, price, stock, codebar);
};

async function deleteProduct(id) {
    return await dao.delete(id);
};

async function saveCarts(obj) {
    return await cartsDao.save(obj);
};

async function getAllCarts() {
    return await cartsDao.getAll();
};

function getProductsDao() {
    return productsDao;
};

function getCartsDao() {
    return cartsDao;
};

module.exports = {
    saveProducts,
    getAllProducts,
    updateProduct,
    deleteProduct,
    saveCarts,
    getAllCarts,
    getProductsDao,
    getCartsDao
}