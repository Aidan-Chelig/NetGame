const server = require('./server');

server.listen(3000, function load() {
  this.pino.info(`Server listening on ${JSON.stringify(server.address().port)}`);
});
