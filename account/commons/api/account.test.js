const account = require("./account")

test("get and dont allow change", () => {
  const fakeAccount = {
    id: 123,
    balance: 0,
    config: {
      isBlocked: false,
      hasOverdraft: false
    }
  }
  const resultAccount = account.get()
  expect(resultAccount).toEqual(fakeAccount)

  resultAccount.config.isBlocked = true
  expect(resultAccount.config.isBlocked).toEqual(false)
})