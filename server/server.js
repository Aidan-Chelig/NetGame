const net = require('net');
const PromisedSocket = require('./promised-socket');

const logger = require('./logger');

// eslint-disable-next-line no-unused-vars
const connections = {
    valid: [],
    invalid: []
};

const pino = logger();

// create a server and callback for onconnect then add the user to the userlist class
const server = net.createServer(async function(_socket) {
    const socket = PromisedSocket(_socket);

    socket.expect = 0; // We are expecting the first message back from the user.
	
    // Set a timeout for the handshake we dont want the client wasting our time.
    socket.setTimeout(5000, () => {
        socket.writeAsync('TIMEOUT').then(() => {
            socket.end();
        });
    });

    await socket.writeAsync(`netgame v.${process.env.npm_package_version}`);
    
    socket.on('data', (data) => {
        pino.info(data);
        // wait for response, if its OK continue, anything else close connection
        // wait for a valid rsa public key of 1024 bit length
        // send our public key
        // change timeout to something more resonable like 3 minutes as the user logs in
        // put the socket, user and their rsa public key in the USERS storage then pass the user to the game
    });
});

Object.assign(server, { pino });

module.exports = server;
