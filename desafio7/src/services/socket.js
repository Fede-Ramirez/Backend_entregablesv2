const socketIo = require('socket.io');
const { getAllProducts } = require('../controllers/products');
const { getAllMessages } = require('../controllers/messages');

let io;

const initWsServer = (server) =>{
    io = socketIo(server)

    io.on('connection', (socket) =>{
        console.log('Se ha establecido una nueva conexión')

        socket.on('addProduct', async (product) =>{
            try{
                product.price = Number(product.price);
                let id;
                const products = await getAllProducts();

                if(products){
                    id = products[products.length -1].id +1;
                }
    
                const newProduct = {
                    title: product.title,
                    price: parseInt(product.price),
                    image: product.img,
                    id: id
                };

                products.push(newProduct);
                io.emit('addTable', products[products.length-1]);
            }catch (err){
                console.log(err);
            }
        })

        socket.on('newMessage', async (message) =>{
            try{
                const messages = await getAllMessages();
                const newMessage  = {
                    email: message.email,
                    message: message.msg,
                }
                messages.push(newMessage);
                io.emit('renderMessage', messages[messages.length-1]);
            }catch(err){
                console.log(err);
            }
        })
    })
return io;
}

module.exports = initWsServer;