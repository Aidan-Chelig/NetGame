const { User, Users } = require('./users');
const net= require('net');
const pjson = require('./package.json');


// eslint-disable-next-line no-unused-vars
const connections = {
    valid: [],
    invalid: []
};
let userlist;

// create a server and callback for onconnect then add the user to the userlist class
const server = net.createServer((socket) => {
    socket.expect = 0; // we are expecting the first message back from the user;
    // set a timeout for the handshake we dont want the client wasting our time
    socket.setTimeout(1000, () => {
        socket.write('TIMEOUT', () => {
            socket.end();
        });
    });

    handshake(socket);
});

function handshake(socket){
    asyncWrite(socket, 'netgame ver.' + pjson.version) // send the project name and version
        .then(() => { return asyncOnData(socket);})
        .then((data) => { console.log('response: ' + data);}); // wait for response, if its OK continue, anything else close connection
    // wait for a valid rsa public key of 1024 bit length
    // send our public key
    // change timeout to something more resonable like 3 minutes as the user logs in
    // put the socket, user and their rsa public key in the USERS storage then pass the user to the game
}


function asyncWrite(socket, message){
    return new Promise(function(resolve,reject){
        socket.write(message, resolve);
    });
}

function asyncOnData(socket){
    return new Promise( (resolve, reject) => {
        socket.on('data', resolve);
    });
}

module.exports = {
    Start: (port, u) => {
        if (u instanceof Users) {
            userlist = u;
        } else {
            console.log('ERROR: invalid Users object');
            return 1;
        }

        server.listen({
            port: port
        }, () => {
            // eslint-disable-next-line no-console
            console.log('TCP Server is running:', server.address());
        });
    }
};
