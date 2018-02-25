const logger = require('./logger');

module.exports = {
    logger,
    
    isJSON(string) {
        try { JSON.parse(string); } catch (e) { return false; }
        return true;
    }
};