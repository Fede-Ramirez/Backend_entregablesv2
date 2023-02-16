const { Router } = require('express');
const { saveProductsController, getAllProductsController } = require('../controllers/products');
const router = Router();

router.get('/available-products', getAllProductsController);
router.post('/new-products', saveProductsController);


/*
router.get('/', getAllProducts)
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
*/

module.exports = router;