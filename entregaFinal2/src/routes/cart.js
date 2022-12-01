const { Router } = require('express');
const { getProductsInCart, createCart, addNewProductToCart, deleteCart, deleteProductInCart } = require('../controllers/cart');
const router = Router();

router.get('/:id/productos', getProductsInCart)
router.post('/', createCart)
router.post('/:id/productos', addNewProductToCart)
router.delete('/:id', deleteCart)
router.delete('/:id/productos/:id_prod', deleteProductInCart)

module.exports = router;