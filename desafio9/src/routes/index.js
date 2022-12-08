const { Router } = require('express');
const productsRouter = require('./products');
const messagesRouter = require('./messages')
const router = Router();

router.use('/products', productsRouter);
router.use('/messages', messagesRouter);

module.exports = router;