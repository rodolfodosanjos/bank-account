const create = table => ({
  getById: table.getById,
  getAll: table.getAll,
  save: table.save,
  remove: table.remove
})

module.exports = {
  create
}