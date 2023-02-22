const { Router } = require('express');
const { saveProductsController, getAllProductsController } = require('../controllers/products');
const router = Router();

router.get('/available-products', getAllProductsController);
router.post('/new-products', saveProductsController);

module.exports = router;