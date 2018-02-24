const net = require('net');
const {promisify} = require('util');

const logger = require('./logger');

// eslint-disable-next-line no-unused-vars
const connections = {
    valid: [],
    invalid: []
};

// create a server and callback for onconnect then add the user to the userlist class
const server = net.createServer(function(socket) {
    const { debug } = this.pino;
    
    promisify(socket.setTimeout);
    promisify(socket.write);

    socket.expect = 0; // we are expecting the first message back from the user;
	
    // set a timeout for the handshake we dont want the client wasting our time
    socket.setTimeout(1000).then(() => {
        socket.write('TIMEOUT').then(() => {
            socket.end();
        });
    });

    socket.write(`netgame v.${process.env.npm_package_version}`).then(() => {
        socket.on('data', (data) => {
            debug(data);
            // wait for response, if its OK continue, anything else close connection
            // wait for a valid rsa public key of 1024 bit length
            // send our public key
            // change timeout to something more resonable like 3 minutes as the user logs in
            // put the socket, user and their rsa public key in the USERS storage then pass the user to the game
        });
    });
});

server.pino = logger();

module.exports = server;
