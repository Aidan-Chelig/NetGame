const users = require('./users');
const net = require('net');
var connections = {valid: [], invalid: []};
var userlist;
// create a server and callback for onconnect then add the user to the userlist class
const server = net.createServer((socket) => {
    var temp = new users.User('test');
    userlist.addUser({user: temp, tcpsocket: socket});
    
});

module.exports = {
    Start: (port) => {
        server.listen({port: port}, () => {
        console.log("TCP Server is running:", server.address());
        });
    },
    SetUsers: (u) => {
        if (u instanceof users.Users)
            userlist = u; 
    }
}
