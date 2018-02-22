const { Users } = require('./users');
const tcpserver = require('./tcpserver');
const NodeRSA = require('node-rsa');
var userlist = new Users();

let key = NodeRSA();

key.generateKeyPair(1024);

console.log(key.getMaxMessageSize())

tcpserver.Start(3000, userlist);
