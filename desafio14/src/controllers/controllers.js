const products = require('../utils/products');
const randomNumbers = require('../utils/randomFunction');

const getInfo = (req, res) => {
    try {
        console.log(`PID= ${process.pid}`)
        res.json({
            pid: process.pid,
            msg: 'Hola usuario, este es nuestro catálogo de productos',
            products: products,
        });
    } catch (err) {
        console.log(err);
    }
}

const slowRequest = (req, res) => {
    try {
        console.log(`PID= ${process.pid}`);
        let sum = 0;
        for (let i = 0; i < 15006500445; i++) {
            sum += i;
        }
        res.json({
            pid: process.pid,
            sum,
        });
    } catch (err) {
        console.log(err);
    }
}

const exitProcess = (req, res) => {
    try {
        res.json({msg: 'Ok, el proceso ha finalizado, reinicie si desea continuar navegando'});
        process.exit(0);
    } catch (err) {
        
    }
}

const getRandomNumbers = (req, res) => {
    res.json({
        msg: 'Estos son sus números',
        numbers: randomNumbers
    })
}

module.exports = {
    getInfo,
    slowRequest,
    exitProcess,
    getRandomNumbers
}