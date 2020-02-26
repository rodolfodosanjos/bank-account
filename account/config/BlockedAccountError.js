module.exports = class BlockedAccountError extends Error {
  constructor(message) {
    super(message)
  }
}