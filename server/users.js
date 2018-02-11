class User {
	constructor(uuid) {
		this.username = 'null';
		this.uuid = uuid;
	}
}

class Users {
	constructor() {
		this.tcpsockets = {};
		this.users = {};
	}

	set getUserByUuid(uuid) {
		return this.users[uuid];
	}

	set getTcpSocketByUuid(uuid) {
		return this.tcpsockets[uuid];
	}

	set removeUser(uuid) {
		delete this.users[uuid];
		delete this.tcpsockets[uuid];
	}

	set addUser(options) {
		if (options.user && options.tcpsocket && options.user instanceof User && options.user.uuid) {
			this.users[options.user.uuid] = options.user;
			this.tcpsockets[options.uuid] = options.tcpsocket;
			return this.users[options.user.uuid];
		} else {
			return 1;
		}
	}
}

export default {
	User: User,
	Users: Users
};
