const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        title: { type: String, require: true, max: 100 },
        price: { type: Number, require: true },
        stock: { type: Number, required: true },
    },
    { versionKey: false }
);

module.exports = ProductSchema;