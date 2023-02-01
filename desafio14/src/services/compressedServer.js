const express = require('express');
const products = require('../utils/products');
const compression = require('compression');

const app = express();

app.use(compression());

app.get('/gzip', (req, res) => {
    res.send(products);
});

module.exports = app;