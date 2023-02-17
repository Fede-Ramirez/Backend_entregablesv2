const express = require('express');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const session = require('express-session');
const config = require('../config/config');
const { signUpFunction, loginFunction } = require('./auth');
const mainRouter = require('../routes');
const logger = require('./log4jsConfig');

const app = express();

app.use(express.json());

const ttlSeconds = 1800;

const StoreOptions = {
    store: MongoStore.create({
        mongoUrl: config.MONGO_ATLAS_URL,
        crypto: {
        secret: config.SESSION_SECRET_KEY,
        },
    }),
    secret: config.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: ttlSeconds * 1000,
    },
};

app.use(session(StoreOptions));

app.use(passport.initialize());
app.use(passport.session());

passport.use('login', loginFunction);
passport.use('signup', signUpFunction);

app.use('/api', mainRouter);

app.use(function (err, req, res, next) {
    const status = err.statusCode || 500;
    const msg = err.message || 'Internal Server Error';
    const stack = err.stack;
    logger.error(err);
    res.status(status).send({ 
        msg, stack 
    });
});

module.exports = app;