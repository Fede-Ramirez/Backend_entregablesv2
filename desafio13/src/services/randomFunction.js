const random = (quantity) => {
    const numbers = [];
    let min = 0;
    let max = 1000;
    for (let i = 0; i < quantity; i++) {
        numbers.push(Math.floor((Math.random() * (max-min) + 1) + min))
    };
    return numbers;
}

const randomNumbers = random(1000);

module.exports = randomNumbers;