const { Router } = require('express');
const { saveCartsController, getAllCartsController } = require('../controllers/carts');
const router = Router();

router.get('/carts-orders', getAllCartsController);
router.post('/new-cart', saveCartsController);

/*
router.get('/:id/productos', getProductsInCart)
router.post('/', createCart)
router.post('/:id/productos', addNewProductToCart)
router.delete('/:id', deleteCart)
router.delete('/:id/productos/:id_prod', deleteProductInCart)
*/

module.exports = router;