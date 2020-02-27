const fs = require("fs")
const path = require("path")
const ValidationError = require("../error/ValidationError")

const openTable = tableName => {
  const filePath = path.join(__dirname, `${tableName}.json`)

  return new Promise((resolve, reject) =>
    fs.readFile(filePath, {
      encoding: 'utf-8'
    }, (err, data) => {
      if (err) return reject(err)
      resolve(JSON.parse(data))
    })
  )
}

const saveTable = (tableName, items) => {
  if (!items) {
    const VALIDATION_ERROR_MSG = "Nenhum item foi dado para salvar"
    throw new ValidationError(VALIDATION_ERROR_MSG)
  }

  const filePath = path.join(__dirname, `${tableName}.json`)
  return new Promise((resolve, reject) =>
    fs.writeFile(filePath,
      JSON.stringify(items),
      err => {
        if (err) return reject(err)
        resolve()
    })
  )
}

module.exports = {
  openTable,
  saveTable
}