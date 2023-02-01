const express = require('express');
const http = require('http');
const path = require('path');
const mainRouter = require('../routes');
const app = express();
const server = new http.Server(app);
const { getAllProducts } = require('../controllers/products');
const { getAllMessages } = require('../controllers/messages');

const publicPath = path.resolve(__dirname, '../../public');
const viewsPath = path.resolve(__dirname, '../../views');

app.use(express.json());
app.use(express.static(publicPath));
app.use('/api', mainRouter);
app.set('view engine', 'ejs');
app.set('views', viewsPath );

app.get('/',async (req, res, next) =>{
    try{
        const products = await getAllProducts();
        const messages = await getAllMessages();
        res.render('formulario', {products, messages});
    }catch (err){
        next(err);
    }
})

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({
        message,
    })
});

module.exports = server;
