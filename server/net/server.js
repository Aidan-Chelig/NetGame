const net = require('net');
const PromisedSocket = require('./promised-socket');

class Server extends net.Server {
    constructor(connListener) {
        super();
        
        this.on('connection', sock => connListener(PromisedSocket(sock)) );
    }
}

module.exports = Server;