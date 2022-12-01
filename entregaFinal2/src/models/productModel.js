const mongoose = require('mongoose');
const productsCollection = 'producto';

const ProductSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        timestamp: { type: String, require: true, max: 100 },
        title: { type: String, require: true, max: 100 },
        description: { type: String, require: true, max: 100 },
        code: { type: String, default: false },
        photo: { type: String, require: true, max: 100 },
        price: { type: Number, require: true },
        stock: { type: Number, required: true },
    },
    { versionKey: false }
);

const ProductModel = mongoose.model(productsCollection, ProductSchema);

module.exports = { ProductModel };