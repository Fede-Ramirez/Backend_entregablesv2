const { Router } = require('express');
const { saveCartsController, getAllCartsController } = require('../controllers/carts');
const router = Router();

router.get('/carts-orders', getAllCartsController);
router.post('/new-cart', saveCartsController);

module.exports = router;