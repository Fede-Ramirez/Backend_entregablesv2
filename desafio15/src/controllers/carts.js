const { saveCartsService, getAllCartsService } = require("../services/cartsServices");

const saveCartsController = async (req, res) => {
    const { body } = req;
    try {
        const carts = await saveCartsService(body);
        res.json(carts);
    } catch (error) {
        console.log(error);
    }
}

const getAllCartsController = async (req, res) => {
    try {
        const carts = await getAllCartsService();
        res.json(carts);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    saveCartsController,
    getAllCartsController
}

/*

const moment = require('moment');
const { CartModel } = require('../models/cartModel');
const { ProductModel } = require('../models/productModel');

const getProductsInCart = async (req, res) => {
    try {
        if (isNaN(req.params.id)) {
            return res.status(400).json({
                error: 'El id ingresado no es válido!',
            });
        }

        const id = parseInt(req.params.id);
        const cart = await CartModel.findOne({ id: id });

        if (!cart) {
            return res.status(404).json({
                mensaje: 'No se ha encontrado el carrito solicitado',
            });
        } else {
            return res.status(200).json({
                data: cart,
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
};

const findLastCartId = async () => {
    try {
        let lastCart = await CartModel.findOne().sort({ id: -1 }).limit(1);
        let lastCartId = lastCart.id;
        return lastCartId;
    } catch (err) {
        console.log('No se ha logrado encontrar el id');
        console.log(err.message)
    }
}

const createCart = async (req, res) => {
    try {
        let lastCartId = await findLastCartId();
        let newCartId = lastCartId + 1;
        let id = newCartId;
        let timestamp = moment().format("DD-MM-YYYY HH:MM:SS");
        let products = [];

        await CartModel.create({
            id,
            timestamp,
            products,
        });

        return res.status(201).json({
            mensaje: 'El carrito fue creado con exito',
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
}

const addNewProductToCart = async (req, res) => {
    try {
        if (isNaN(req.params.id)) {
            return res.status(400).json({
                error: 'El id ingresado no es válido',
            });
        }

        const cartId = parseInt(req.params.id);
        const productId = parseInt(req.body.id);
        let cart = await CartModel.findOne({ id: cartId });

        if (!cart) {
        return res.status(404).json({
            mensaje: 'No se ha logrado encontrar el carrito',
        });
        }

        let product = await ProductModel.findOne({ id: productId });
        let products = cart.products;
        products.push(product);

        if (!product) {
            return res.status(404).json({
                mensaje: 'No se ha encontrado el producto',
            });
        } else {
            const productAddedToCart = await CartModel.findByIdAndUpdate(
                cart._id,
                { products },
                { new: true }
            );
            return res.status(201).json({
                mensaje: 'Se ha agregado el producto al carrito con éxito',
            });
        }
    } catch (err) {
        return res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
}

const deleteCart = async (req, res) => {
    try {
        if (isNaN(req.params.id)) {
            return res.status(400).json({
                error: 'El id ingresado no es válido',
            });
        }

        const id = parseInt(req.params.id);
        let cart = await CartModel.findOne({ id: id });

        if (!cart) {
            return res.status(404).json({
                mensaje: 'El carrito que desea eliminar no existe!',
            });
        } else {
            await CartModel.findByIdAndDelete(cart._id);
            return res.status(200).json({
                mensaje: 'El carrito se ha eliminado con éxito!',
            });
        }
    } catch (err) {
        return res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
}

const deleteProductInCart = async (req, res) => {
    try {
        if (isNaN(req.params.id) || isNaN(req.params.id_prod)) {
            return res.status(400).json({
                error: 'Los id ingresados no son válidos!',
            });
        }
        const cartId = parseInt(req.params.id);
        const productId = parseInt(req.params.id_prod);

        let cart = await CartModel.findOne({ id: cartId });

        if (!cart) {
            return res.status(404).json({
                mensaje:'No se ha logrado encontrar el carrito',
            });
        }

        let productExists = cart.products.find((item) => item.id == productId);

        if (!productExists) {
            return res.status(404).json({
                mensaje: 'El producto que desea eliminar no existe!',
            });
        } else {
            let products = cart.products;
            const filteredProducts = products.filter((item) => item.id !== productId);
            products = filteredProducts;

            const cartWithoutProduct = await CartModel.findByIdAndUpdate(cart._id, {
                products,
            });

            return res.status(201).json({
                mensaje: 'Se ha eliminado el producto con éxito',
            });
        }
    } catch (err) {
        return res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
}

module.exports = {
    getProductsInCart,
    createCart,
    addNewProductToCart,
    deleteCart,
    deleteProductInCart
}

*/