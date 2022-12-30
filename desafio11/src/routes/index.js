const { Router } = require('express');
const passport = require('passport');
const { logInVerification, adminVerification } = require('../middlewares/auth');
const { logIn, signUp, logOut, processInfo, sessionInfo } = require('../controllers/controller');
const userRouter = require('./user');
const randomRouter = require('./fork');

const router = Router();
const passportOptions = { badRequestMessage: 'Falta el usuario y/o la contraseña' };

router.get('/info',logInVerification, processInfo);
router.get('/session',logInVerification, sessionInfo);
router.post('/login', passport.authenticate('login', passportOptions), logIn);
router.post('/signup', signUp);
router.post('/logout', logOut);
router.use('/user', logInVerification, userRouter);
router.use('/randoms', logInVerification, randomRouter);

module.exports = router;