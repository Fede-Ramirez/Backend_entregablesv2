const product = document.querySelector('#productsForm');
const title = document.querySelector('#title');
const price = document.querySelector('#price');
const image = document.querySelector('#image');
const tableBody = document.querySelector('#tableBody');
const chat = document.querySelector('#messagesForm');
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const messageBox = document.querySelector('#messageContainer');

const socket = io();

product.addEventListener('submit', (e) =>{
    e.preventDefault()

    let newProduct = {
        title: title.value,
        price: price.value,
        image: image.value
    }

    socket.emit('addProduct', newProduct)

        title.value = " "
        price.value = " "
        image.value = " "
});

const addProductToTable = (data) =>{
    
    const lastProduct = data.pop();

    const trInput = document.createElement('tr');
    const id = document.createElement('td');
    const title = document.createElement('td');
    const price = document.createElement('td');
    const imgURL = document.createElement('td');
    const tdImage = document.createElement('td');
    const image = document.createElement('img');

    id.innerText = lastProduct.id;
    title.innerText = lastProduct.title;
    price.innerText = lastProduct.price;
    image.setAttribute('src', lastProduct.imgURL);
    image.setAttribute('alt', 'Imagen no disponible'); 
    
    trInput.appendChild(id);
    trInput.appendChild(title);
    trInput.appendChild(price);
    trInput.appendChild(tdImage);
    tdImage.appendChild(image);


    tableBody.appendChild(trInput);
}

socket.on('addTable',(data) =>{
    addProductToTable(data);
})

chat.addEventListener('submit', (e) =>{
    e.preventDefault()

    let newMessage = {
        email: email.value,
        message: message.value
    }

    socket.emit('newMessage', newMessage)

    email.value= ''
    message.value = ''
})

const addNewMessage = (data) =>{

    const lastMessage = data.pop();

    const messageContainer = document.createElement('div');
    const messageEmail = document.createElement('p');
    const messageTime = document.createElement('span');
    const messageText = document.createElement('p');

    messageEmail.innerText = lastMessage.email;
    messageText.innerText = lastMessage.msg;
    messageTime.innerText = lastMessage.time;

    messageContainer.appendChild(messageEmail);
    messageEmail.appendChild(messageTime);
    messageContainer.appendChild(messageText);

    messageBox.appendChild(messageContainer);
}

socket.on('renderMessage', (data) =>{
    addNewMessage(data);
})