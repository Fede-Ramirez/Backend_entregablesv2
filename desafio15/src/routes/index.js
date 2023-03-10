const Router = require('koa-router');
const productsRouter = require('./products.js');
const cartRouter = require('./cart.js');

const router = new Router({
    prefix: '/api'
});

router.use(productsRouter);
router.use(cartRouter);

router.get("/", (ctx) => {
    console.log(ctx);
});

module.exports = router.routes();