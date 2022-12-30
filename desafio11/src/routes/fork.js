const { Router } = require('express');
const { fork } = require('child_process');
const router = Router();
const path = require('path');
const scriptPath = path.resolve(__dirname, '../services/fork.js');


router.get('/', (req, res) => {
    const { quantity } = req.query; 
    const computo = fork(scriptPath);
    computo.send(quantity);
    computo.on('message', (numbers) => {
        res.json({
            result: numbers,
        });
    });
});

module.exports = router;
