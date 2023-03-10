const Router = require('koa-router');
const { saveProductsController, getAllProductsController, updateProductController, deleteProductController } = require('../controllers/products');

const router = new Router({
    prefix: '/products',
});

router.get('/available-products', getAllProductsController);
router.post('/new-products', saveProductsController);
router.put('/update-product/:id', updateProductController);
router.delete('/delete-product/:id', deleteProductController);

module.exports = router.routes();