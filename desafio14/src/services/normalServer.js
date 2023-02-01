const express = require('express');
const products = require('../utils/products');

const app = express();

app.get('/', (req, res) => {
    res.send(products);
});

module.exports = app;