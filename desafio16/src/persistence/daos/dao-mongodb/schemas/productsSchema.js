const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        name: { type: String, require: true, max: 100 },
        price: { type: Number, require: true },
        stock: { type: Number, required: true },
        codebar: { type: String, require: true },
    },
    { versionKey: false }
);

module.exports = ProductSchema;
