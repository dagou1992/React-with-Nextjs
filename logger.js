const winston = require('winston');
const expressWinston = require('express-winston');
const moment = require('moment');

const { consoleTransport, infoFileTransport, errorFileTransport } = require('./transports');

function getip(req) {
    return req.ip ||
        req._remoteAddress ||
        (req.connection && req.connection.remoteAddress) ||
        undefined
}

function getMetaData(req, res) {
    return {
        remoteAddress: getip(req),
        localTime: moment().toLocaleString(),
        id: req.headers['x-auth-token'] || undefined,
    }
}

function createLogger() {
    return expressWinston.logger({
        transports: [
            consoleTransport,
            infoFileTransport
        ],
        meta: true,
        expressFormat: true,
        dynamicMeta: getMetaData,
        ignoreRoute: (req, res) => {
            return /^\/monitor\/ping.*/.test(req.url);
        }
    })
}

function createErrorLogger() {
    return expressWinston.errorLogger({
        transports: [
            consoleTransport,
            errorFileTransport
        ],
        dynamicMeta: getMetaData
    })
}

function createNormalLogger() {
    return new (winston.Logger)({
        transports: [
            consoleTransport,
            infoFileTransport,
            errorFileTransport
        ]
    });
}

module.exports = createNormalLogger();
module.exports.createLogger = createLogger;
module.exports.createErrorLogger = createErrorLogger;