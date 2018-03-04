/*
---------- General Handshake flow ----------
Client sends version -> server validates version (if invalid throw invalid version error), server
responds with OK.

Client sends their public key -> server checks the clients public key (if key is bad throw bad key
error), stores the key in state, and responds with the servers public key.

Client encypts message with our public key, and sends it to server -> we decrypt public key, then
encrypt message with their public key, and send it to them.

Client decrypts message, and sends the message -> Validates that message is what we sent (If not
throw handshake failed error), set state.secured to true, then respond with OK.
 */
const Response = require('../net/response');
const {
  BadVersion, BadOperation, AlreadySecured, BadKey,
} = require('../errors');

const resolver = [
  /**
     * Opcode 0
     * @description Simply returns to validate the server is accepting requests.
     * @returns OK
     */
  async function ping() {
    return new Response('OK');
  },

  /**
     * Opcode 1
     * @description Checks if the version matches the version the server is running.
     * @returns OK if version does match.
     * @throws {InvalidVersion} if version does not match.
     */
  async function checkVersion(request) {
    const { data } = request;

    if (data === process.env.npm_package_version) {
      return new Response('OK');
    }
    throw new BadVersion(request);
  },

  // TODO: Define public key requirements.
  /**
     * Opcode 2
     * @description Checks if public key is valid, and sends servers public key.
     * @returns Servers public key if clients key meets requirements.
     * @throws {BadKey} if public RSA key does not meet requirements.
     */
  async function storeAndGenerateKey({ config }, request) {
    const { state, data } = request;

    try {
      state.key.importKey(data, 'public');
    } catch (e) {
      throw new BadKey(request);
    }

    return new Response(config.key.export('public'));
  },

  /**
     * Opcode 3
     * @description Start the challenge process by decrypting their challenge and creating and
     * encrypting our own.
     * @returns The decrypted version of their challenge and the encrypted version of ours that was
     * generated.
     */
  async function initiateChallenge() {
    // TODO: Fill
    return this;
  },

  /**
     * Opcode 3
     * @description Validates the challenge decrypted by the client.
     * @returns OK if the challenge was accepted.
     */
  async function finalizeChallenge() {
    // TODO: Fill
    return this;
  },
];

module.exports = {
  process: (server, request) => {
    const { translatedOpCode, state } = request;

    if (translatedOpCode >= resolver.length) { throw new BadOperation(request); }

    if (state.secure) { throw new AlreadySecured(request); }

    return resolver[translatedOpCode](server, request);
  },
};
