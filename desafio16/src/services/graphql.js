const { buildSchema } = require('graphql');
const { saveProductsController, getAllProductsController, updateProductController, deleteProductController } = require('../controllers/graphql/products');

const graphqlSchema = buildSchema(`
    input InputProduct{
        id: Int!
        name: String!
        price: Int!
        stock: Int!
        codebar: String!
    }
    input InputEditProduct{
        name: String!
        price: Int!
        stock: Int!
        codebar: String!
    }
    type Product{
        _id: String!
        id: Int
        name: String
        price: Int
        stock: Int
        codebar: String
    }
    type Query{
        getAllProductsController:[Product]
    }
    type Mutation{
        saveProductsController(data: InputProduct!):Product
        updateProductController(id: Int!, data: InputEditProduct!):Product
        deleteProductController(id: Int!):Boolean
    }
`)

const graphqlRoot = {
    saveProductsController,
    getAllProductsController,
    updateProductController,
    deleteProductController
}

module.exports = {
    graphqlSchema,
    graphqlRoot
};