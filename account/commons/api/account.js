const deepFreeze = require("deep-freeze")

const get = () => deepFreeze({
  id: 123,
  balance: 0,
  config: {
    isBlocked: false,
    hasOverdraft: false
  }
})

module.exports = {
  get
}