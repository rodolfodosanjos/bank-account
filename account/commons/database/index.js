const fs = require("fs")
const path = require("path")
const deepFreeze = require("deep-freeze")

const openTable = tableName => {
  const filePath = path.join(__dirname, `${tableName}.json`)

  return new Promise((resolve, reject) =>
    fs.readFile(filePath, {
      encoding: 'utf-8'
    }, (err, data) => {
      if (err) reject(err)
      resolve(JSON.parse(data))
    })
  )
}

const saveTable = (tableName, items) => {
  const filePath = path.join(__dirname, `${tableName}.json`)

  return new Promise((resolve, reject) =>
    fs.writeFile(filePath,
      JSON.stringify(items),
      err => {
        if (err) reject(err)
        resolve()
    })
  )
}

const createId = () => String(Math.random() * 10000000000000000)

const createTable = tableName => {
  const getAll = () => openTable(tableName)

  return {
    getAll,
    getById: async id => {
      const items = await getAll()
      return items.find(item => item.id === id)
    },
    save: async item => {
      const items = await getAll()
      let itemToBeSaved = item
      let itemsToSave = []
      if (!item.id) {
        itemToBeSaved = deepFreeze({
          ...item,
          id: createId(),
          created_at: new Date().getTime()
        })
        itemsToSave = [...items, itemToBeSaved]
      } else {
        itemsToSave = items.filter(savedItem => savedItem.id !== itemToBeSaved.id)
        itemsToSave.push(item)
      }
      await saveTable(tableName, itemsToSave)
      return itemToBeSaved
    },
    remove: async itemId => {
      const items = await getAll()
      const itemsToSave = items.filter(savedItem => savedItem.id !== itemId)
      return saveTable(tableName, itemsToSave)
    }
  }
}

const database = () => ({
  DatabaseTests: createTable("Accounts"),
  DatabaseTests: createTable("DatabaseTests")
})

module.exports = database