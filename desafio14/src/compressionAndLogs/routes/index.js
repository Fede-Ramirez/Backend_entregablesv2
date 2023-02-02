const compression = require('compression');
const { Router } = require('express');
const router = Router();
const logger = require('../services/log4jsConfig');
const products = require('../utils/products');
const randomNumbers = require('../utils/randomFunction');

router.get('/info',  (req, res) => {
    try {
        logger.info(`PID= ${process.pid}`);
        logger.info(`${req.route} - ${req.method}`);
        res.json({
            pid: process.pid,
            msg: 'Hola usuario, este es nuestro catálogo de productos',
            products: products,
        });
    } catch (err) {
        logger.error(err);
    }
})    
router.get('/slow', (req, res) => {
    try {
        logger.info(`PID= ${process.pid}`);
        logger.info(`${req.route} - ${req.method}`);
        let sum = 0;
        for (let i = 0; i < 15006500445; i++) {
            sum += i;
        }
        res.json({
            pid: process.pid,
            sum,
        });
    } catch (err) {
        logger.error(err);
    }
});
router.get('/dead', (req, res) => {
    try {
        logger.info(`${req.route} - ${req.method}`);
        res.json({msg: 'Ok, el proceso ha finalizado, reinicie si desea continuar navegando'});
        process.exit(0);
    } catch (err) {
        logger.error(err);
    }
});

/*Ambas rutas son las mismas, solo que una lleva compression y la otra no para poder comparar la diferencia de bytes en cada caso. Comenta y descomenta para realizar las pruebas*/

router.get('/randoms', compression(), (req, res) => {
    try {
        logger.info(`${req.route} - ${req.method}`);
        res.json({
            msg: 'Estos son sus números',
            numbers: randomNumbers
        })
    } catch (err) {
        logger.error(err);
    }
});

/*router.get('/randoms', (req, res) => {
    try {
        logger.info(`${req.route} - ${req.method}`);
        res.json({
            msg: 'Estos son sus números',
            numbers: randomNumbers
        })
    } catch (err) {
        logger.error(err);
    }
});*/

module.exports = router;