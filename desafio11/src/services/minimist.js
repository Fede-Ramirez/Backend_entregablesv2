const minimist = require('minimist');

const optionalArgsObject = {
    alias: {
        p: 'puerto',
    },
    default: {
        p: 8080
    },
};

const args = minimist(process.argv, optionalArgsObject);
console.log('Transformación argv con minimist')
console.log(args);

const objetoFinal = {
    puerto: args.puerto
}

console.log('Objeto final con minimist')
console.log(objetoFinal);

module.exports = objetoFinal;