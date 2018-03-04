const server = require('./server');

server.listen(3000, function() {
    this.pino.info(`Server listening on ${JSON.stringify(server.address().port)}`);
});
