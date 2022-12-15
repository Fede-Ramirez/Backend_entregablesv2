const { Router } = require('express');
const router = Router();
const { login, logout, visit, infoSession } = require('../controllers/controllers');
const { validateLogIn } = require('../middlewares/middlewares');

router.post('/login', login);
router.get('/info', validateLogIn, infoSession);
router.get('/secret-endpoint', validateLogIn, visit);
router.post('/logout', logout);

module.exports = router;