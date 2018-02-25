const { OPCODE_SECTION_RANGE } = require('../router');

class Request {
    constructor(id = 0, opcode = 0, data = {}, state = {}, args = []) {
        this.id = id;
        this.opcode = opcode;
        this.data = data;
        this.args = args;
        
        this.state = state;
        
        this.transgenederedOpcode = this.opcode % OPCODE_SECTION_RANGE; // It's progresive! ima kill myself
    }
}

module.exports = Request;