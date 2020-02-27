const database = require("./")
const deepFreeze = require("deep-freeze")
const fs = require("fs")
const databaseTests = deepFreeze(require("./DatabaseTests.json"))
const path = require("path")

test("gets info from database and dont allow to mutate instance", async() => {
  const testsFound = await database().DatabaseTests.getAll()
  expect(testsFound).toEqual(databaseTests)
})

test("gets by id info from database", async() => {
  const TEST_ID = 123
  const databaseTestsFound = await database().DatabaseTests.getById(TEST_ID)
  expect(databaseTestsFound).toEqual(databaseTests.find(test => test.id === TEST_ID))
})

describe("save", () => {
  test("create in database when does NOT have ID", async() => {
    const testToSave = {
      "config_id": new Date().getTime(),
      "fake_prop": new Date().getTime()
    }
    const expectedTest = {
      ...testToSave,
      id: expect.any(String),
      created_at: expect.any(Number)
    }
    const createdTest = await database().DatabaseTests.save(testToSave)
    const testAfterCreation = await database().DatabaseTests.getById(createdTest.id)
  
    expect(createdTest).toEqual(expectedTest)
    expect(testAfterCreation).toEqual(createdTest)
  })
  test("update in database when has ID", async() => {
    const testToSave = {
      "config_id": new Date().getTime(),
      "fake_prop": new Date().getTime(),
      "id": new Date().getTime(),
      "created_at": new Date().getTime()
    }
    const FAKE_CHANGE = "fake change"
    const createdTest = await database().DatabaseTests.save({
      ...testToSave,
      fake_prop: FAKE_CHANGE
    })
    const testAfterUpdate = await database().DatabaseTests.getById(testToSave.id)
  
    expect(createdTest).toEqual({
      ...testToSave,
      fake_prop: FAKE_CHANGE
    })
    expect(testAfterUpdate).toEqual(createdTest)
  })
})

test("removes by id from database", async() => {
  const TEST_ID = 321
  const testFound = await database().DatabaseTests.getById(TEST_ID)
  await database().DatabaseTests.remove(TEST_ID)
  const testAfterDeletion = await database().DatabaseTests.getById(TEST_ID)

  expect(testFound).toBeDefined()
  expect(testAfterDeletion).toEqual(undefined)
})

afterAll(() => {
  const filePath = path.join(__dirname, "DatabaseTests.json")
  fs.writeFileSync(filePath, JSON.stringify(databaseTests))
})