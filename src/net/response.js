class Response {
  constructor(data = {}, headers = {}) {
    this.data = data;
    this.headers = headers;

    this.shouldEnd = false;
  }
}

module.exports = Response;
