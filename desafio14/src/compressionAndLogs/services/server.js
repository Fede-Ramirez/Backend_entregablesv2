const express = require('express');
const products = require('../utils/products');
const mainRouter = require('../routes/index');
const logger = require('./log4jsConfig');

const app = express();
app.use(express.json());
app.use('/api', mainRouter);

app.use((req, res) => {
    logger.error(`${req.url}`);
    logger.info(`${req.url} - ${req.method}`);
    return res.status(404).json({
        error: `la ruta ${req.url} no ha sido implementada`,
    });
});

module.exports = app;