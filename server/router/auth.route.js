/*
---------- General Handshake flow ----------
Client sends version -> server validates version (if invalid throw invalid version error), server responds with OK.
Client sends their public key -> server checks the clients public key (if key is bad throw bad key error), stores the key in state, and responds with the servers public key.
Client encypts message with our public key, and sends it to server -> we decrypt public key, then encrypt message with their public key, and send it to them
Client decrypts message, and sends the message -> Validates that message is what we sent (If not throw handshake failed error), set state.secured to true, then respond with OK.
 */
const { BadVersion } = require('../errors');

const resolver = [
    /**
     * Opcode 0
     * @description Simply returns to validate the server is accepting requests.
     * @returns Pong
     */
    async function ping() {
        return { headers: {}, response: 'OK' };
    },
    
    /**
     * Opcode 1
     * @description Checks if the version matches the version the server is running.
     * @returns OK if version does match.
     * @throws {InvalidVersion} if version does not match.
     */
    async function checkVersion(body) {
        if (body === process.env.npm_package_version){
            return {headers: {}, response: 'OK' };
        } else {
            throw new BadVersion();
        }
    },
    
    // TODO: Define public key requirements.
    /**
     * Opcode 2
     * @description Checks if public key is valid, and sends servers public key.
     * @returns Servers public key if clients key meets requirements.
     * @throws {BadKey} if public RSA key does not meet requirements.
     */
    async function storeKey() {
        
    },
    
    /**
     * Opcode 3
     * @description 
     * @returns 
     * @throws 
     */
    async function () {
        
    }
];

module.exports = {
    process: ({ opcode, body, state, args }) => resolver[opcode](body, state, args)
};