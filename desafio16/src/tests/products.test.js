const mongoose = require('mongoose');
const ProductsSchema = require('../persistence/daos/dao-mongodb/schemas/productsSchema');
const app = require('../services/server');
const request = require('supertest');
const config = require('../config/config');

let ProductsModel = mongoose.model('products', ProductsSchema);

describe('Tests server products', () => {
    /*beforeEach(async() => {
        //jest.setTimeout(90000);
        await mongoose.connection.collections['products'].drop();
    });*/

    /*beforeEach(async () => {

        await mongoose.connect("mongodb://localhost:27017/desafio16");//localhost:27017/desafio15%22);%60%60%60)
        //await mongoose.connect(config.MONGO_ATLAS_URL);

        await mongoose.connection.db.dropCollection("products");
    
    });*/
    
    /*afterAll(async () => {
    
    // Desconectamos de la base de datos de prueba y detenemos el servidor_
    
        await mongoose.disconnect();
    
    });*/

    it('post product', async ()=>{
        const product = {
            id: 5,
            name: 'cornalitos frescos',
            price: 3000,
            stock: 40,
            codebar: 'mcoiesnf3un49'
        };

        const response = await request(app)
            .post('/api/products/new-products')
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

        //await ProductsModel.create(product);
        const response = await request(app)
            .get('/api/products/available-products');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].name).toBe(product.name);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0].name).toEqual(expect.stringContaining('cornalitos'));
    });

    it('update product', async()=>{
        const product = {
            id: 6,
            name: 'name test',
            price: 60,
            stock: 16,
            codebar: 'codebar test'
        };

        //const responseProduct = await ProductsModel.create(product);

        const productUpdated = {
            name: 'name test updated',
            price: 70,
            stock: 13,
            codebar: 'codebar test updated'
        };

        const response = await request(app).put('/api/products/5').send(productUpdated);

        expect(response.statusCode).toBe(200);
        expect(response.body.modifiedCount).toBe(1);
    })
    
    it('delete product', async()=>{
        const product = {
            id: 5,
            name: 'cornalitos',
            price: 3000,
            stock: 40,
            codebar: 'mcoiesnf3un49'
        };

        //const responseCreate = await ProductsModel.create(product);
        const response = await request(app).delete('/api/products/5');

        expect(response.statusCode).toBe(200);
        expect(response.body.deletedCount).toBe(1);
    });
})
