const fs = require('fs');
const path = require('path');

const winston = require('winston');
require('winston-daily-rotate-file');

// argv
const argv = require('minimist')(process.argv.slice(2));
const logDirectory = process.env.LOG_PATH || argv.l || path.join(__dirname, 'log');

console.log('logDirectory set to: ' + logDirectory);

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const consoleTransport = new winston.transports.Console({
    json: true,
    colorize: true
})

const infoFileTransport = new ((winston.transports.DailyRotateFile))({
    name: 'info-file',
    filename: path.join(logDirectory, './tomshop-h5.log'),
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    localTime: true,
    level: 'info'
})

const errorFileTransport = new ((winston.transports.DailyRotateFile))({
    name: 'error-file',
    filename: path.join(logDirectory, './tomshop-h5.error.log'),
    prepend: true,
    localTime: true,
    level: 'error'
})

exports.consoleTransport = consoleTransport;
exports.infoFileTransport = infoFileTransport;
exports.errorFileTransport = errorFileTransport;