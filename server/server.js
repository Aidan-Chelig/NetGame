const logger = require('./logger');

const Server = require('./net/server');
const State = require('./net/state');

const Router = require('./router');

const { NetworkError, GeneralError } = require('./errors');

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
    socket.on('data', (data) => {
        const [ opcode, body, reqId, ...args ] = data;
        const request = {
            reqId,
            opcode,
            body,
            state: socket.state,
            args
        };
        
        Router.process(request).then(result => {
            socket.write([
                Object.assign({ reqId }, result.headers),
                Object.assign({}, result.response)
            ]);
            
            if (result.shouldEnd) socket.end();
        }).catch(err => {
            let finalError = Object.assign({}, err);
            
            if (!(err instanceof NetworkError)) {
                pino.error(err);
                
                finalError = new GeneralError();
            }
            
            socket.write(finalError.toResponse());
        });
    });
});

Object.assign(server, { pino });

module.exports = server;
