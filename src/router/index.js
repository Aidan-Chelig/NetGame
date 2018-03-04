const { BadOperation } = require('../errors');

const AuthRoute = require('./auth.route');

const OPCODE_SECTION_RANGE = 100;

const resolvers = [
  AuthRoute.process,
];

module.exports = {
  OPCODE_SECTION_RANGE,

  async process(server, request) {
    const { opcode } = request;

    if (opcode >= resolvers.length * OPCODE_SECTION_RANGE) { throw new BadOperation(request); }

    resolvers[Math.floor(opcode / OPCODE_SECTION_RANGE)](server, request);
  },
};
