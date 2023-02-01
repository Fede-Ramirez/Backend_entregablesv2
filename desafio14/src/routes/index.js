const compression = require('compression');
const { Router } = require('express');
const router = Router();
const { getInfo, slowRequest, exitProcess, getRandomNumbers } = require('../controllers/controllers');

router.get('/info', getInfo);
router.get('/slow', slowRequest);
router.get('/dead', exitProcess);
router.get('/randoms', compression(), getRandomNumbers);
/*router.get('/randoms', getRandomNumbers);*/

module.exports = router;