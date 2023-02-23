const { productsDTOfunction } = require('../dto/productsDTO');
const { getProductsDao } = require('../daos/factory');

class ProductsRepository {
    constructor() {
        this.dao = getProductsDao();
    }

    async save (productsParam) {
        const products = await this.dao.save(productsParam);
        return products;
    }

    async getAll() {
        const products = await this.dao.getAll();
        const productsDTO = productsDTOfunction(products);
        return productsDTO;
    }
};

module.exports = { ProductsRepository };

