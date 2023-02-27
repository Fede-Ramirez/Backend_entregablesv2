const { axiosGetFunction } = require('./axios-methods/axios-get.js');
const { axiosPostFunction } = require('./axios-methods/axios-post.js');
const { axiosPutFunction } = require('./axios-methods/axios-put.js');
const { axiosDeleteFunction } = require('./axios-methods/axios-delete.js');
const logger = require('../services/log4jsConfig');


//Sugerencia: para ver mejor la funcionalidad de los métodos recomiendo comentar todas salvo la funcionalidad que se desea probar
//logger.info('Ejecutando tests con axios');

const axiosUtilities = async() => {
    //logger.info('se ejecuta axios-get');
    //await axiosGetFunction();

    //logger.info('se ejecuta axios-post');
    //await axiosPostFunction();

    //logger.info('se ejecuta axios-put');
    //await axiosPutFunction();

    logger.info('se ejecuta axios-delete');
    await axiosDeleteFunction()
};

module.exports = { axiosUtilities }