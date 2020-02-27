const deepFreeze = require("deep-freeze")
const { openTable, saveTable } = require("./tableFileManipulation")

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
  Accounts: createTable("Accounts"),
  Entries: createTable("Entries"),
  DatabaseTests: createTable("DatabaseTests")
})

module.exports = database