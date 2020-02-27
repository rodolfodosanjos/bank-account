const { create } = require("../database/apiFromDatabaseCreation")
const database = require("../database")

module.exports = create(database.Accounts)