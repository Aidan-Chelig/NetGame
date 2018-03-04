const fs = require('fs');
const path = require('path');
const NodeRSA = require('node-rsa');

// eslint-disable-next-line no-unused-vars
module.exports = function load(options = {}) {
  const { pino } = options;

  let config = {};

  const configPath = path.resolve(__dirname, '../config.json');

  try {
    config = fs.readFileSync(configPath, 'utf-8');
  } catch (e) {
    pino.warn(`Unable to load config file (${configPath})`);
  }

  const key = new NodeRSA({ b: 1024 });

  return Object.assign(config, { key });
};
