const { cartsDTOfunction } = require('../dto/cartsDTO');
const { getCartsDao } = require('../daos/factory');

class CartsRepository {
    constructor() {
        this.dao = getCartsDao();
    }

    async save (cartsParam) {
        const carts = await this.dao.save(cartsParam);
        return carts;
    }

    async getAll() {
        const carts = await this.dao.getAll();
        const cartsDTO = cartsDTOfunction(carts);
        return cartsDTO;
    }
};

module.exports = { CartsRepository };