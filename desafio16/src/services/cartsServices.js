const { CartsRepository } = require("../persistence/repository/cartsRepository");

const cartsRepository = new CartsRepository();

async function saveCartsService(items){
    const carts = await cartsRepository.save(items)
    return carts;
};

async function getAllCartsService() {
    const carts = await cartsRepository.getAll();
    return carts;
};

module.exports = {
    saveCartsService,
    getAllCartsService
};