const pino = require('pino');

//eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
    const pretty = pino.pretty();
	
    pretty.pipe(process.stdout);
	
    return pino({
        name: 'NetGame',
        safe: true
    }, pretty);
};
