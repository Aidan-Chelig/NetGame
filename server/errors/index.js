// IMPORTANTE! DO NO PUT COLONS IN MESSAGE!!

class NetworkError extends Error {
    constructor(message) {
        super(message);
    }
    
    toResponse() {
        return `${this.code}: ${this.message}`;
    }
}

class GeneralError extends NetworkError {
    constructor() {
        super('An internal error occured.');
        
        this.code = 'GEN_ERR';
    }
}

class BadOperation extends NetworkError {
    constructor(opcode) {
        super(`${opcode} is not a valid opcode.`);
        
        this.code = 'BAD_OP';
    }
}

class BadVersion extends NetworkError {
    constructor(theirVersion, ourVersion) {
        super(`Version '${theirVersion}' does not match server ('${ourVersion}').`);

        this.code = 'BAD_VER';
    }
}

module.exports = {
    NetworkError,
    GeneralError,
    BadOperation,
    BadVersion
};