const express = require('express');
const passport = require ('passport');
const session = require('express-session');
const { signUpFunction, logInFunction } = require('./auth');
const mainRouter = require('../routes');

const app = express();
app.use(express.json());

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use('/api', mainRouter);

passport.use('login', logInFunction);
passport.use('signup', signUpFunction);

module.exports = app;