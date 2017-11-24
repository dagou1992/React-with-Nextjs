const fs = require('fs');
const path = require('path');

const minimist = require('minimist');
const express = require('express');
const proxy = require('http-proxy-middleware');
const rfs = require('rotating-file-stream');
const next = require('next');
const moment = require('moment');

const logger = require('./logger');
const analytics = require('./analytics');

// argv
const argv = require('minimist')(process.argv.slice(2));
logger.info('argv: %j', argv);
const env = process.env.NODE_ENV || argv.e  || 'production';
const proxyTarget = process.env.PROXY_TARGET || argv.t || 'http://121.196.200.108:9004';
const serverPort = process.env.SERVER_PORT || argv.p || 3000;
const serverHost = process.env.SERVER_HOST || argv.h || '127.0.0.1';

process.env.NODE_ENV = env;

logger.info('env set to: ' + env);
logger.info('proxyTarget set to: ' + proxyTarget);

const dev = env === 'development';
const app = next({dir: __dirname, dev });
const handle = app.getRequestHandler()

const proxyOptions = {
    target: proxyTarget,
    changeOrigin: true,
    pathRewrite: {
        '^/api/': '/'           // remove base path
    },
}

const apiProxy = proxy(proxyOptions);

app.prepare()
    .then(() => {
        const server = express()
        server.use(logger.createLogger());

        server.get('/monitor/ping', (req, res) => {
            res.send('pong');
        });
        server.use('/pv', analytics);

        server.use('/api', apiProxy);

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(serverPort, serverHost, (err) => {
            if (err) throw err
            logger.info(`> Ready on http://${serverHost}:${serverPort}`)
        })

        server.use(logger.createErrorLogger());
    })
    .catch((ex) => {
        logger.error(ex.stack)
        process.exit(1)
    })