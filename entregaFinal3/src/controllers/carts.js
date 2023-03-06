const { CartAPI,  } = require('../api');
const { ApiError, ErrorStatus } = require('../api/errors');


const getCart = async (req, res) => {
    const { user } = req;
    const cart = await CartAPI.getCartByUser(user._id);

    res.json({
        data: cart,
    });
};

const addProduct = async (req, res) => {
    const { user } = req;
    const { productId, amount } = req.body;

    if (!productId || !amount) {
        throw new ApiError('Error: parámetros inválidos', ErrorStatus.BadRequest);
    }

    const cart = await CartAPI.getCartByUser(user._id);
    const result = await CartAPI.addProduct(cart._id, productId, amount);

    res.json({ 
        msg: 'Producto agregado con éxito', 
        data: result 
    });
};

const deleteProduct = async (req, res) => {
    const { user } = req;
    const { productId, amount } = req.body;

    if (!productId) {
        throw new ApiError('Error: parámetros inválidos', ErrorStatus.BadRequest);
    }

    const cart = await CartAPI.getCartByUser(user._id);
    const result = await CartAPI.deleteProducts(cart._id, productId, amount);

    res.json({ 
        msg: 'Producto eliminado con éxito', 
        data: result 
    });
};

const createOrder = async (req, res) => {
    const { user } = req;
    const cart = await CartAPI.getCartByUser(user._id);

    await CartAPI.createOrder(cart._id);

    res.json({
        msg: 'Su orden ha sido creada con éxito',
    });
};

module.exports = {
    getCart,
    addProduct,
    deleteProduct,
    createOrder,
};