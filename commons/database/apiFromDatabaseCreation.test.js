const { create } = require("./apiFromDatabaseCreation")

test("get only required api methods from table", () => {
  const getById = () => {}
  const getAll = () => {}
  const save = () => {}
  const remove = () => {}
  const fakeMethod = () => {}
  const table = {
    getById,
    getAll,
    save,
    remove,
    fakeMethod
  }

  const createdTable = create(table)

  expect(createdTable).toEqual({
    getById,
    getAll,
    save,
    remove
  })
  expect(createdTable.getById).toBe(getById)
  expect(createdTable.getAll).toBe(getAll)
  expect(createdTable.save).toBe(save)
  expect(createdTable.remove).toBe(remove)
})