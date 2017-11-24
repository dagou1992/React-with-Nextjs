const path = require('path');
const minimist = require('minimist');

const logger = require('../logger');

const argv = require('minimist')(process.argv.slice(2));

const configFile = process.env.CONFIG_FILE || argv.c || 'dev.js';

let config = null;

const resolvedConfigFile = path.isAbsolute(configFile) ? configFile : path.join(__dirname, configFile);

logger.info('resolvedConfigFile set to: ' + resolvedConfigFile);

config = require(resolvedConfigFile);

module.exports = config;