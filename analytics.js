const Redis = require('ioredis');
const moment = require('moment');

const logger = require('./logger');
const config = require('./config/index');

var redis = new Redis({
    port: config.redis.port,
    host: config.redis.host,
    password: config.redis.password,
    keyPrefix: config.redis.keyPrefix
});

const hashKey = 'h5pv';

function getDailyPvKey() {
    const dateFormat = 'YYYYMMDD';
    const dateStr = moment().format(dateFormat);
    return 'd' + dateStr;
}

module.exports = function analytics(req, res) {
    const url =  req.param('url');
    logger.debug('analytics pv', url);

    const key = getDailyPvKey();

    redis.hincrby(hashKey, key, 1)
        .then(result => {
            logger.info(`set pv value ${hashKey}.${key} to ${result}`);
            res.send({
                code: 0,
                message: 'ok'
            });
        }).catch(err => {
            logger.error(err);
            res.status(500).send('analytics pv failed!');
        })
}