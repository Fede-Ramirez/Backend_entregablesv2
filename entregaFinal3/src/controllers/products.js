const { ProductsAPI } = require('../api');

const getAllProducts = async (req, res) => {
    const products = await ProductsAPI.find();
    res.json({
        data: products,
    });
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await ProductsAPI.find(id);

    if (!product) {
        return res.status(404).json({ msg: 'El producto solicitado no existe' });
    } 

    res.json({
        data: product,
    });
};

const createProduct = async (req, res) => {
    const { name, description, stock, price, categoryId } = req.body;

    if (!name || !description || !stock || !price || !categoryId) {
        return res.status(400).json({ 
            msg: 'Error: parámetros inválidos' 
        });
    }

    const newProduct = {
        name,
        description,
        stock,
        price,
        categoryId,
    };

    const product = await ProductsAPI.create(newProduct);

    res.json({
        msg: 'Producto creado con éxito',
        data: product,
    });
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, stock, price, categoryId } = req.body;

    if (!name && !description && !stock && !price && !categoryId) {
        return res.status(400).json({ 
            msg: 'Error: parámetros inválidos' 
        });
    };

    const newData = {
        name,
        description,
        stock,
        price,
        categoryId,
    };

    const productUpdated = await ProductsAPI.update(id, newData);

    res.json({
        msg: 'Producto actualizado con éxito',
        data: productUpdated,
    });
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await ProductsAPI.find(id);

    if (!product) {
        return res.status(404).json({ 
            msg: 'El producto que desea eliminar no existe' 
        });
    };

    await ProductsAPI.remove(id);

    res.json({
        msg: 'Producto eliminado con éxito',
    });
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};