const random = (quantity) => {
    try {
        const numbers = [];
        for (let i = 0; i < quantity; i++) {
            numbers.push(Math.random())
        }
        return numbers;
    } catch (err) {
        console.log(err);
        resizeBy.json({
            message: 'Ha ocurrido un error al ejecutar la función'
        })
    }
}

process.on('message', (quantity) => {
    if (!quantity) {
        const defaultNumber = random(100000000)
        process.send(defaultNumber)
    } else {
        const numbers = random(quantity)
        process.send(numbers);
    }
});

