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

    async updateProduct(id, name, price, stock, codebar) {
        const productUpdated = await this.dao.update(id, name, price, stock, codebar);
        return productUpdated;
    }

    async deleteProduct(id) {
        const productDeleted = await this.dao.delete(id);
        return productDeleted;
    }
};

module.exports = { ProductsRepository };

