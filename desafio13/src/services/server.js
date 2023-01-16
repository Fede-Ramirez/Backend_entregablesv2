const express = require('express');
const app = express();
const randomNumbers = require('./randomFunction');
const port = require('../index')

app.get('/', (req, res) => {
    console.log(`PID => ${process.pid} will answer`);

    res.json({
        pid: process.pid,
        msg: `HOLA USUARIO, ESTÁS EN EL PUERTO ${port}`,
    });
});

app.get('/slow', function (req, res) {
    console.log(`PID => ${process.pid} will work slow`);
    let addition = 0;
    for (let i = 0; i < 6e9; i++) {
        addition += i;
    }

    res.json({
        pid: process.pid,
        addition,
    });
});

app.get('/dead', (req, res) => {
    const { code } = req.query;
    res.json({ msg: 'OK' });
    console.log(`PID => ${process.pid} will die`);
    process.exit(code ? Number(code) : 0);
});

app.get('/api/randoms', (req, res) => {
    
    res.json({
        msg: `HOLA DESDE PUERTO ${port}`,
        port8081: randomNumbers,
    })
});

module.exports = app;