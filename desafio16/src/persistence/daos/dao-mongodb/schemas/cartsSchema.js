const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        user: { type: String, required: true },
        products: { type: Array, required: true },
        orderId: { type: String, required: true }
    },
    { versionKey: false }
);

module.exports = CartSchema;
