const mongoose = require('mongoose');
const cartsCollection = 'carrito';

const CartSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        timestamp: { type: String, require: true, max: 100 },
        products: { type: Array, required: true },
    },
    { versionKey: false }
);

const CartModel = mongoose.model(cartsCollection, CartSchema);

module.exports = { CartModel };