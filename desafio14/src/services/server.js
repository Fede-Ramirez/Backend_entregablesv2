const express = require('express');
const products = require('../utils/products');
const mainRouter = require('../routes/index');

const app = express();
app.use(express.json());
app.use('/api', mainRouter);

app.get('/gzip', (req, res) => {
    res.send(products);
});

module.exports = app;