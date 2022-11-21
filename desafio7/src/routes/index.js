const { Router } = require('express');
const productsRouter = require('./products');
const messagesRouter = require('./messages');
const mainRouter = Router();

mainRouter.use('/products', productsRouter);
mainRouter.use('/messages', messagesRouter);

module.exports = mainRouter;
