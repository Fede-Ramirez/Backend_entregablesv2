const log4js = require('log4js');

log4js.configure({
    appenders: {
        console: { type: 'console' },
        warnFileAppender: { type: 'file', filename: './logs/warns.log' },
        errorFileAppender: {type: 'file', filename: './logs/errors.log'},
    },
    categories: {
        default: { appenders: ['console'], level: 'info' },
        warnLogger: { appenders: ['warnFileAppender'], level: 'warn' },
        errorLogger: { appenders: ['errorFileAppender'], level: 'error'},
    },
});

const logger = log4js.getLogger();

module.exports = logger;