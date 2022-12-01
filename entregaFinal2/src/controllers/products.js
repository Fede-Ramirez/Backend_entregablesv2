const { initMongoDB, disconnectMongo } = require('../services/database');
const { ProductModel } = require('../models/productModel');

const insertProducts = async (newProducts) => {
    try{
        console.log('Insertando los primeros productos');
        await ProductModel.create(newProducts);
        console.log("Inserción realizada con éxito\n\n");
    } catch (err) {
        console.log('Ha ocurrido un error');
        console.log(err.message);
    }
}

const initializeProductsCollection = async () => {
	await initMongoDB();

	const products = [
		{
			id: 1,
            timestamp: "09-11-22 19:43:30",
            title: "Camiseta",
            description: "Camiseta",
            code: "1A",
            photo:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhttp2.mlstatic.com%2Fcamisa-argentina-adidas-modelo-2010-D_NQ_NP_426611-MLB20596402796_022016-F.jpg&f=1&nofb=1&ipt=89188d63c75849a0f2451507c0573dc0be3225ab2de232e59650e90b22c4df5a&ipo=images",
            price: 2000,
            stock: 10
		},
		{
            id: 2,
            timestamp: "09-11-22 19:44:15",
            title: "Camisa",
            description: "Camisa negra",
            code: "1B",
            photo:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdhb3yazwboecu.cloudfront.net%2F335%2Fcamisa-negra-algodon-sols-17000_l.jpg&f=1&nofb=1&ipt=871791baa0fb6e7f37ab46530fdd41c5e90ced1764a9d89b4dd4cb6fd589e08c&ipo=images",
            price: 3000,
            stock: 15
		}
	]

	const insertions = products.map(product => insertProducts(product));
	await Promise.all(insertions);
	await disconnectMongo();
}

const getAllProducts = async () => {
    await initMongoDB();

    const products = await ProductModel.find();
    console.log('Se han encontrado los siguientes productos en la base de datos:');
    console.log(products); 

    await disconnectMongo();
}

// initializeProductsCollection();