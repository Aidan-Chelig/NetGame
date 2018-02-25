const net = require('net');
const PromisedSocket = require('./promised-socket');

class Server extends net.Server {
    constructor(pino, config, connListener) {
        super();
        
        this.pino = pino;
        this.config = config;
        
        this.on('connection', sock => connListener(PromisedSocket(sock)) );
    }
}

module.exports = Server;