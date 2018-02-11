import { User, Users } from './users';
import net from 'net';

// eslint-disable-next-line no-unused-vars
const connections = {
	valid: [],
	invalid: []
};
let userlist;

// create a server and callback for onconnect then add the user to the userlist class
const server = net.createServer((socket) => {
	var temp = new User('test');
	userlist.addUser({user: temp, tcpsocket: socket});
});

export default {
	Start: (port) => {
		server.listen({
			port: port
		}, () => {
			// eslint-disable-next-line no-console
			console.log('TCP Server is running:', server.address());
		});
	},
	SetUsers: (u) => {
		if (u instanceof Users) {
			userlist = u;
		}
	}
};
