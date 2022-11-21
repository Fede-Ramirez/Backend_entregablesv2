const { productsInstance } = require('../services/database');

const getAllProducts = async (req, res) => {
    try {
        const products = await productsInstance.get();
        res.json(products);
    }
    catch (err) {
        res.status(400).json(err.message)
    }
}

const getOneProduct = async (req, res) => {
    try {
        const product = await productsInstance.get({id: req.params.id});
        res.json(product);
    } 
    catch (err) {
        res.status(400).json(err.message);
    }
}

const createProduct = async (req, res) => {
    try {
        await productsInstance.create(req.body);
        res.status(200).send('Producto guardado con éxito!');
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}

const updateProduct = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        await productsInstance.update(id, body);
        res.json(body);
    } catch (err) {
        res.status(400).json(err.message);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await productsInstance.delete(id);
        res.send('Producto eliminado!');
    } catch (err) {
        res.status(400).json(err.message);
    }
}

module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
};