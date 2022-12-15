const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mainRouter = require('../routes');
const MongoStore = require('connect-mongo');
const config = require('../config');

const ttlSeconds = 180;

const StoreOptions = {
    store: MongoStore.create({
        mongoUrl: config.MONGO_ATLAS_URL,
        crypto: {
            secret: 'squirrel',
        },
    }),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: ttlSeconds * 1000,
    },
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(session(StoreOptions));

app.use('/api', mainRouter);

module.exports = app;
