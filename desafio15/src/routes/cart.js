const Router = require('koa-router');
const { saveCartsController, getAllCartsController, deleteCartController } = require('../controllers/carts');

const router = new Router({
    prefix: '/carts',
});

router.get('/carts-orders', getAllCartsController);
router.post('/new-cart', saveCartsController);
router.delete('/delete-cart/:id', deleteCartController);

module.exports = router.routes();