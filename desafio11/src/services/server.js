const express = require('express');
const passport = require ('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const config = require('../config');
const { signUpFunction, logInFunction } = require('./auth');
const mainRouter = require('../routes/index');

const app = express();
app.use(express.json());

const ttlSeconds = 180;

const StoreOptions = {
    store: MongoStore.create({
        mongoUrl: config.MONGO_ATLAS_URL,
        crypto: {
            secret: 'squirrel',
        },
    }),
    secret: 'secretString',
    autoRemoveInterval: 300,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: ttlSeconds * 1000,
    },
};

app.use(session(StoreOptions)); 
app.use(passport.initialize());
app.use(passport.session());

passport.use('login', logInFunction);
passport.use('signup', signUpFunction);

app.use('/api', mainRouter);

module.exports = app;