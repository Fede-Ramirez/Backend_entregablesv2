const { faker } = require('@faker-js/faker');
faker.locale = 'es';

const getRandomProducts = (req, res) => {
    try {
        const answer = [];
    
        for(let i =0; i<5; i++){
            answer.push({
                title: faker.commerce.product(),
                price: faker.commerce.price(100, 10000, 0, '$'),
                photo: faker.internet.avatar(),
            })
        }
        res.status(200).json({
            data: answer
        });
    } catch (err) {
        res.status(500).json({
            msg: 'Error al traer los productos aleatorios',
        })
        console.log(err);
    }
}

module.exports = { getRandomProducts };