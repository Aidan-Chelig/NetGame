const NodeRSA = require('node-rsa');

const { Users } = require('./users');
var userlist = new Users(); // eslint-disable-line no-unused-vars

const server = require('./server');

let key = NodeRSA();
key.generateKeyPair(1024);

server.listen(3000, function() {
    this.pino.info(`Server listening on ${JSON.stringify(server.address().port)}`);
});
