const Koa = require('koa');
const { koaBody } = require("koa-body");
const mainRouter = require('../routes/index');
const logger = require('./log4jsConfig');

const app = new Koa();
app.use(koaBody());
app.use(mainRouter);

app.use((ctx, next) => {
    logger.error(`ruta ${ctx.url} no implementada`)
    
    ctx.body = ({
        status: 'error',
        description: `La ruta ${ctx.url} no existe`,
    });
    ctx.status = 404;
});

module.exports = app;