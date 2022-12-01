const moment = require('moment');
const { ProductModel } = require('../models/productModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        console.log('Se han encontrado los siguientes productos en la base de datos:');
        console.log(products);
        res.status(200).json({
            data: products,
        }); 
    } catch (err) {
        return res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
}

const getProductById = async (req, res) => {
    try {
        if(isNaN(req.params.id)) {
            return res.status(400).json({
                error: 'El id ingresado no es válido!',
            });
        }

    const id = parseInt(req.params.id);
    let product = await ProductModel.findOne({ id: id });

    if (!product) {
        return res.status(404).json({
            mensaje: 'El producto solicitado no existe!',
        });
    } else {
        console.log(product);
        return res.status(200).json({
            data: product,
        });
    }
    } catch (err) {
        return res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
}

const findLastProductId = async () => {
    try {
        let lastProduct = await ProductModel.findOne().sort({ id: -1 }).limit(1);
        let lastProductId = lastProduct.id;
        return lastProductId;
    } catch (err) {
        console.log('No se logró encontrar el id')
        console.log(err.message)
    }
}

const createProduct = async (req, res) => {
    try {
        const { title, description, code, photo, price, stock } = req.body;
        let lastProductId = await findLastProductId();
        let newProductId = lastProductId + 1;
        let id = newProductId;
        let timestamp = moment().format("DD-MM-YYYY HH:MM:SS");

        if(!title || !description || !code || !photo || !price || !stock) {
            res.status(400).json({
                mensaje: 'Faltan datos!'
            })
        }

        const newProduct = await ProductModel.create({
            id,
            timestamp,
            title,
            description,
            code,
            photo,
            price,
            stock,
        });
            return res.status(201).json({
                data: newProduct,
            });
    } catch (err) {
        return res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        if (isNaN(req.params.id)) {
            return res.status(400).json({
                error: 'El id ingresado no es válido!',
            });
        }
        const id = parseInt(req.params.id);
        const { title, description, code, photo, price, stock } = req.body;
        let product = await ProductModel.findOne({ id: id });

        if (!product) {
            return res.status(404).json({
                mensaje: 'El producto que desea actualizar no existe!',
            });
        } else {
            const productUpdated = await ProductModel.findByIdAndUpdate(
                product._id,
                { title, description, code, photo, price, stock },
                { new: true }
            );

            return res.status(200).json({
                mensaje: 'El producto fue actualizado con éxito!',
                data: productUpdated,
            });
        }
    } catch (err) {
        return res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        if (isNaN(req.params.id)) {
            return res.status(400).json({
                error: 'El id ingresado no es válido!',
            });
        }

        const id = parseInt(req.params.id);
        let product = await ProductModel.findOne({ id: id });

        if (!product) {
            return res.status(404).json({
                mensaje: 'El producto que desea eliminar no existe!',
            });
        } else {
            await ProductModel.findByIdAndDelete(product._id);
            return res.status(200).json({
                mensaje: 'El producto se ha eliminado con éxito',
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
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
