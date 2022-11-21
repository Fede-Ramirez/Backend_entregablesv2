const { Router } = require('express');
const { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/products');
const router = Router();

router.get('/', async (req, res)=>{
    res.render('formulario')
});

router.get('/', getAllProducts);
router.get('/:id', getOneProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;