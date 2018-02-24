module.exports = socket => {
    return Object.assign(socket, {
        writeAsync(data, encoding) {
            return new Promise(resolve => socket.write(data, encoding, resolve));
        }
    });
};