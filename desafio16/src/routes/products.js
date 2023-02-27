const { Router } = require('express');
const { saveProductsController, getAllProductsController, updateProductController, deleteProductController } = require('../controllers/products');
const router = Router();

router.get('/available-products', getAllProductsController);
router.post('/new-products', saveProductsController);
router.put('/:id', updateProductController);
router.delete('/:id', deleteProductController);

module.exports = router;