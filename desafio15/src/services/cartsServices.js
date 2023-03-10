const { saveCarts, getAllCarts, deleteCart } = require("../persistence/persistence.js");

async function saveCartsService(items){
    const carts = await saveCarts(items)
    return carts;
};

async function getAllCartsService() {
    const carts = await getAllCarts();
    return carts;
};

async function deleteCartService(id) {
    const cartDeleted = await deleteCart(id);
    return cartDeleted;
};

module.exports = {
    saveCartsService,
    getAllCartsService,
    deleteCartService
};