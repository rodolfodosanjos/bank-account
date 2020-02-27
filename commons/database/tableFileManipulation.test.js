const { openTable, saveTable } = require("./tableFileManipulation")
const deepFreeze = require("deep-freeze")
const tableFileManipulationTests = deepFreeze(require("./TableFileManipulationTests.json"))
const fs = require("fs")
const path = require("path")
const ValidationError = require("../error/ValidationError")

describe("get info", () => {
  test("gets info from file", async() => {
    const testsFound = await openTable("TableFileManipulationTests")
    expect(testsFound).toEqual(tableFileManipulationTests)
  })

  test("rejects if get failes", async() => {
    try {
      await openTable("TableThatDoesNotExit")
      throw new Error("Did not reject promise")
    } catch (e) {
      expect(e.message).toContain("ENOENT:")
    }
  })
})

describe("save info", () => {
  test("saves info", async() => {
    const SAVED_TABLE_PATH = "TableFileManipulationTestsSaved.json"
    const filePath = path.join(__dirname, SAVED_TABLE_PATH)
  
    const expectedTests = {
      fake_field: 123,
      another_fake_field: 123,
      id: 321
    }
    await saveTable("TableFileManipulationTestsSaved", expectedTests)
    const savedTests = require(filePath)
    expect(savedTests).toEqual(expectedTests)
    fs.unlinkSync(filePath)
  })

  test("throws error if NO items are provided", async() => {
    const VALIDATION_ERROR_MSG = "Nenhum item foi dado para salvar"
    try {
      await saveTable("TableFileManipulationTestsSaved")
      throw new Error("Did not reject promise")
    } catch (e) {
      expect(e).toEqual(new ValidationError(VALIDATION_ERROR_MSG))
    }
  })
})