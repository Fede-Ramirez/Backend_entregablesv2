const mongoose = require('mongoose');
const ProductsSchema = require('../persistence/daos/dao-mongodb/schemas/productsSchema');
const app = require('../services/server');
const request = require('supertest');

let ProductsModel = mongoose.model('products', ProductsSchema);

describe('Tests server products', () => {
    beforeEach(async() => {
        jest.setTimeout(90000);
        await mongoose.connection.collections['products'].drop();
    });

    it('post product', async ()=>{
        const product = {
            id: 5,
            name: 'cornalitos',
            price: 3000,
            stock: 40,
            codebar: 'mcoiesnf3un49'
        };

        const response = await request(app)
            .post('/products/new-products')
            .send(product);

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(product.name);
        expect(response.body.price).toBe(product.price);
        expect(response.body.stock).toBe(product.stock);
        expect(response.body.codebar).toBe(product.codebar);
    });

    it('get all products', async()=> {
        const product = {
            id: 5,
            name: 'cornalitos frescos',
            price: 3000,
            stock: 40,
            codebar: 'mcoiesnf3un49'
        };

        await ProductsModel.create(product);
        const response = await request(app)
            .get('/products/available-products');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].name).toBe(product.name);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0].name).toEqual(expect.stringContaining('cornalitos'));
    });

    it('update product', async()=>{
        const product = {
            id: 'id test',
            name: 'name test',
            price: 'price test',
            stock: 'stock test',
            codebar: 'codebar test'
        };

        const responseProduct = await ProductsModel.create(product);

        const productUpdated = {
            name: 'name test updated',
            price: 'price test updated',
            stock: 'stock test updated',
            codebar: 'codebar test updated'
        };

        const response = await request(app).put('/products/5').send(productUpdated);

        expect(response.statusCode).toBe(200);
        expect(response.body.modifiedCount).toBe(1);
    })
    
    it('delete product', async()=>{
        const product = {
            id: 5,
            name: 'name test to be deleted',
            price: 'price test to be deleted',
            stock: 'stock test to be deleted',
            codebar: 'codebar test to be deleted'
        };

        const responseCreate = await ProductsModel.create(product);
        const response = await request(app).delete('/products/5');

        expect(response.statusCode).toBe(200);
        expect(response.body.deletedCount).toBe(1);
    });
})
