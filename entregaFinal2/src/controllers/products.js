const moment = require('moment');
const { initMongoDB } = require('../services/database');
const { ProductModel } = require('../models/productModel');

// const insertProducts = async (newProducts) => {
//     try{
//         console.log('Insertando los primeros productos');
//         await ProductModel.create(newProducts);
//         console.log("Inserción realizada con éxito\n\n");
//     } catch (err) {
//         console.log('Ha ocurrido un error');
//         console.log(err.message);
//     }
// }

// const initializeProductsCollection = async () => {
// 	const products = [
// 		{
// 			id: 1,
//             timestamp: "09-11-22 19:43:30",
//             title: "Camiseta",
//             description: "Camiseta",
//             code: "1A",
//             photo:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhttp2.mlstatic.com%2Fcamisa-argentina-adidas-modelo-2010-D_NQ_NP_426611-MLB20596402796_022016-F.jpg&f=1&nofb=1&ipt=89188d63c75849a0f2451507c0573dc0be3225ab2de232e59650e90b22c4df5a&ipo=images",
//             price: 2000,
//             stock: 10
// 		},
// 		{
//             id: 2,
//             timestamp: "09-11-22 19:44:15",
//             title: "Camisa",
//             description: "Camisa negra",
//             code: "1B",
//             photo:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdhb3yazwboecu.cloudfront.net%2F335%2Fcamisa-negra-algodon-sols-17000_l.jpg&f=1&nofb=1&ipt=871791baa0fb6e7f37ab46530fdd41c5e90ced1764a9d89b4dd4cb6fd589e08c&ipo=images",
//             price: 3000,
//             stock: 15
// 		}
// 	]

// 	const insertions = products.map(product => insertProducts(product));
// 	await Promise.all(insertions);
// }

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
    let lastProduct = await ProductModel.findOne().sort({ id: -1 }).limit(1);
    let lastProductId = lastProduct.id;
    return lastProductId;
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
                mensaje: 'Los datos ingresados son inválidos!'
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

const updateProductById = async (req, res) => {
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

const deleteProductById = async (req, res) => {
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
    updateProductById,
    deleteProductById
}

// initializeProductsCollection();