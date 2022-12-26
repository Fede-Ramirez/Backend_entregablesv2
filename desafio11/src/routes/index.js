const { Router } = require('express');
const { logInVerification } = require('../middlewares/auth');
const { logIn, signUp, logOut, sessionInfo } = require('../controllers/controller');
const userRouter = require('./user');

const router = Router();

router.get('/session', sessionInfo);
router.post('/login', logIn);
router.post('/signup', signUp);
router.post('/logout', logOut);
router.use('/user', logInVerification, userRouter);

module.exports = router;