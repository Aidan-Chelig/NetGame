// IMPORTANTE! DO NO PUT COLONS IN MESSAGE!!

class NetworkError extends Error {
  constructor(id, code, message) {
    super(message);

    this.id = id;
    this.code = code;
  }

  toResponse() {
    return [
      { id: this.id }, // Standard headers
      { code: this.code, message: this.message }, // Error body
    ];
  }
}

class GeneralError extends NetworkError {
  constructor({ id }) {
    super(id, 'GEN_ERR', 'An internal error occured.');
  }
}

class BadOperation extends NetworkError {
  constructor({ id, opcode }) {
    super(id, 'BAD_OP', `${opcode} is not a valid opcode.`);
  }
}

class BadVersion extends NetworkError {
  constructor({ id, version }, ourVersion) {
    super(id, 'BAD_VER', `Version '${version}' does not match server ('${ourVersion}').`);
  }
}

class BadRequest extends NetworkError {
  constructor() {
    super(0, 'BAD_REQ', 'Request not valid.');
  }
}

class AlreadySecured extends NetworkError {
  constructor({ id, opcode }) {
    super(id, 'ALREADY_SECURE', `Access to auth layer OPCODE '${opcode}' rejected, you are already secured.`);
  }
}

class BadKey extends NetworkError {
  constructor({ id }) {
    super(id, 'BAD_KEY', 'The RSA key provided was invalid.');
  }
}

module.exports = {
  NetworkError,
  GeneralError,
  BadOperation,
  BadVersion,
  BadRequest,
  AlreadySecured,
  BadKey,
};
