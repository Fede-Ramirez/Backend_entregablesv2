const { Router } = require('express');
const { getRandomProducts } = require('../controllers/products');
const router = Router();

router.get('/productos-test', getRandomProducts);

module.exports = router;