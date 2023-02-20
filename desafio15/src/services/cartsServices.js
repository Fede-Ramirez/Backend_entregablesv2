const { saveCarts, getAllCarts } = require("../persistence/persistence.js");

async function saveCartsService(items){
    const carts = await saveCarts(items)
    return carts;
};

async function getAllCartsService() {
    const carts = await getAllCarts();
    return carts;
};

module.exports = {
    saveCartsService,
    getAllCartsService
};