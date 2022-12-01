const mongoose = require('mongoose');
const cartsCollection = 'carrito';
const { ProductSchema } = require('./productModel');

const CartSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        timestamp: { type: String, require: true, max: 100 },
        products: { type: [ProductSchema], required: true },
    },
    { versionKey: false }
);

const CartModel = mongoose.model(cartsCollection, CartSchema);

module.exports = { CartModel };