const users = require('./users.js');
const tcpserver = require('./tcpserver');

var userlist = new users.Users()

tcpserver.SetUsers(userlist);
tcpserver.Start(3000);

