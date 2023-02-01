const socketIo = require('socket.io');
const { getAllProducts, createProduct } = require('../controllers/products');
const { getAllMessages } = require('../controllers/messages');
const { productsInstance, messagesInstance } = require('./database');

let io;

const initWsServer = (server) =>{
    io = socketIo(server)

    io.on('connection', async (socket) =>{
        console.log('Se ha establecido una nueva conexión')

        socket.emit('addTable', await getAllProducts());

        socket.on('addProduct', async producto => {
            await productsInstance.create(producto)
            io.sockets.emit('addTable', await getAllProducts());
        })

        socket.emit('renderMessage', await getAllMessages());

        socket.on('newMessage', async mensaje => {
            await messagesInstance.create(mensaje)
            io.sockets.emit('renderMessage', await getAllMessages())
        })
    })
return io;
}

module.exports = initWsServer;