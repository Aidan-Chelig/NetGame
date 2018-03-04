const logger = require('./logger');
const config = require('./config');

module.exports = {
  logger,
  configuration: config,

  isJSON(string) {
    try { JSON.parse(string); } catch (e) { return false; }
    return true;
  },
};
