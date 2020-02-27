const entry = require("./entry")
const config = require("./config")
const Accounts = require("../api/Accounts")

const account = accountFound => ({
  ...entry,
  config
})

module.exports = deepmerge({}, Accounts, {
  account
})