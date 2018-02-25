const Server = require('./net/server');
const Request = require('./net/request');
const State = require('./net/state');

const Router = require('./router');

const { logger, isJSON } = require('./util');
const { NetworkError, GeneralError, BadRequest } = require('./errors');

const pino = logger();

// create a server and callback for onconnect then add the user to the userlist class
const server = new Server(function(socket) {
    // Set a timeout for the handshake we dont want the client wasting our time.
    socket.setTimeout(0, () => { // TODO: Set this to a value on production.
        socket.writeAsync('TIMEOUT').then(() => {
            socket.end();
        });
    });
    
    // Create the state for the socket.
    socket.state = new State();
    
    // Primary request/data handler.
    socket.on('data', (packet) => {
        if (!isJSON(packet.toString('utf-8')))
            return socket.write(new BadRequest().toResponse());
        
        const [ id = 0, opcode = 0, data = '', ...args ] = JSON.parse(packet.toString('utf-8'));
        
        const request = new Request(id, opcode, data, socket.state, args);
        
        Router.process(request).then(response => {
            socket.write([
                Object.assign({ id }, response.headers),
                Object.assign({}, response.data)
            ]);
            
            if (response.shouldEnd) socket.end();
        }).catch(err => {
            if (!(err instanceof NetworkError)) {
                pino.error(err);
                socket.write(new GeneralError().toResponse());
            } else socket.write(err.toResponse());
            socket.end();
        });
    });
});

Object.assign(server, { pino });

module.exports = server;
