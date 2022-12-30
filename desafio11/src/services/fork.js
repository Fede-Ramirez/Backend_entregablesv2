const random = (quantity) => {
    try {
        const numbers = [];
        let min = 0;
        let max = 1000;
        for (let i = 0; i < quantity; i++) {
            numbers.push(Math.floor((Math.random() * (max-min) + 1) + min))
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
        const defaultNumber = random(1000);
        process.send(defaultNumber)
    } else {
        const numbers = random(quantity);
        process.send(numbers);
    }
});

