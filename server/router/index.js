const { BadOperation } = require('../errors');

const AuthRoute = require('./auth.route');

module.exports = {
    async process(request) {
        const { opcode } = request;
        
        if (opcode >= 0 && opcode < 100) { // Authentication
            return AuthRoute.process(request);
        } else {
            throw new BadOperation(opcode);
        }
    }
};