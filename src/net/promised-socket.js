module.exports = socket => Object.assign(socket, {
  writeAsync(data, encoding) {
    return new Promise(resolve => socket.write(data, encoding, resolve));
  },
});
