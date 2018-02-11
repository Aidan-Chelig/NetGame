
class User {
    constructor(uuid){
        this.username = 'null';
        this.uuid = uuid;
    }
}

class Users {
    constructor(){
        this.tcpsockets = {};
        this.users = {};
    }

    set getUserByUuid(uuid){
        return this.users[uuid];
    }

    set getTcpSocketByUuid(uuid){
        return this.tcpsockets[uuid];
    }
    
    set removeUser(uuid){
        delete this.users[uuid];
        delete this.tcpsockets[uuid];
    }

    set addUser(options){
        if(options.user && options.tcpsocket && options.user instanceof User && options.user.uuid){
            this.users[user.uuid] = user;
            this.tcpsockets[uuid] = tcpsocket;
            return this.users[user.uuid];
        } else {
            return 1;
        }
    }
}


module.exports = 
    {
        User: User,
        Users: Users
    }
