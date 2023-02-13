const { CartModel } = require('../models');
const { NotificationService } = require('../services/notifications');
const { ProductsAPI, ApiError, ErrorStatus } = require('./index');

const create = (userId) => {
    CartModel.create({ userId });
};

const getCardByUser = (userId) => {
    CartModel.findOne({ userId });
};

const addProduct = async (cartId, productId, items) => {
    const product = await ProductsAPI.find(productId);

    if (!product) {
        throw new ApiError('Error: el producto no existe', ErrorStatus.BadRequest);
    };

    if (!product.stock || items > product.stock) {
        throw new ApiError('Lo lamentamos, actualmente no contamos con stock disponible para este producto', ErrorStatus.BadRequest);
    };

    const cart = await CartModel.findById(cartId);

    if (!cart) {
        throw new ApiError('Error: el carrito no existe', ErrorStatus.BadRequest);
    }; 

    const index = cart.products.findIndex(
        (aProduct) => aProduct.productId == productId,
    );

    if (index < 0) {
        const newProductItem = {
        productId: productId,
        items: Number(items),
        };
        cart.products.push(newProductItem);
    } else { 
        cart.products[index].items += items;
    };

    await cart.save();

    await ProductsAPI.removeStock(productId, items);

    return cart;
};

const deleteProducts = async (cartId, productId, items) => {
    const product = await ProductsAPI.find(productId);

    if (!product) {
        throw new ApiError('Error: el producto no existe', ErrorStatus.BadRequest);
    };

    const cart = await CartModel.findById(cartId);

    if (!cart) {
        throw new ApiError('Error: el carrito no existe', ErrorStatus.BadRequest);
    };

    const index = cart.products.findIndex(
        (aProduct) => aProduct.productId == productId,
    );

    if (index < 0) {
        throw new ApiError('Error: el producto a eliminar no existe', ErrorStatus.BadRequest);
    };

    if (!items || cart.products[index].items <= items) {
        await ProductsAPI.addStock(productId, cart.products[index].items);
        cart.products.splice(index, 1);
    } else {
        await ProductsAPI.addStock(productId, items);
        cart.products[index].items -= items;
    };

    await cart.save();

    return cart;
};

const emptyCart = async (cartId) => {
    const cart = await CartModel.findById(cartId);

    if (!cart) {
        throw new ApiError('Error: el carrito a vaciar no existe', ErrorStatus.BadRequest);
    } 

    cart.products = [];
    await cart.save();

    return cart;
};

const createOrder = async (cartId) => {
    const cart = await CartModel.findById(cartId);

    if (!cart) {
        throw new ApiError('Error: el carrito no existe', ErrorStatus.BadRequest);
    };

    if (!cart.products.length) {
        throw new ApiError(
        'Error: no puedes crear una orden con el carrito vacío',
        ErrorStatus.BadRequest,
        );
    };

    await NotificationService.notifyNewOrderUsingWhatsApp(cart);

    await emptyCart(cartId);
};

export default {
    create,
    addProduct,
    deleteProducts,
    getCardByUser,
    emptyCart,
    createOrder,
};