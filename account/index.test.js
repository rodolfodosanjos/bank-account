const account = require("./")

test("withdraw", () => {
  const initialState = {
    balance: 10,
    id: 123
  }
  const AMOUNT_TO_WITHDRAW = 5
  const resultAccount = account.withdraw(initialState, AMOUNT_TO_WITHDRAW)
  expect(resultAccount).toEqual({
    ...initialState,
    balance: 5
  })
})

test("deposit", () => {
  const initialState = {
    balance: 10,
    id: 123
  }
  const AMOUNT_TO_DEPOSIT = 10
  const resultAccount = account.deposit(initialState, AMOUNT_TO_DEPOSIT)
  expect(resultAccount).toEqual({
    ...initialState,
    balance: 20
  })
})

describe("config", () => {

  describe("block", () => {
    test("block", () => {
      const initialState = {
        isBlocked: false,
        id: 123
      }
      const resultAccount = account.config.block(initialState)
      expect(resultAccount).toEqual({
        ...initialState,
        isBlocked: true
      })
    })

    test("unblock", () => {
      const initialState = {
        isBlocked: true,
        id: 123
      }
      const resultAccount = account.config.unblock(initialState)
      expect(resultAccount).toEqual({
        ...initialState,
        isBlocked: false
      })
    })

    test("toggle block", () => {
      const initialState = {
        isBlocked: false,
        id: 123
      }
      const resultAccount = account.config.toggleBlock(initialState)
      expect(resultAccount).toEqual({
        ...initialState,
        isBlocked: true
      })
    })
  })

  describe("overdraft", () => {
    test("allow overdraft", () => {
      const initialState = {
        hasOverdraft: false,
        id: 123
      }
      const resultAccount = account.config.allowOverdraft(initialState)
      expect(resultAccount).toEqual({
        ...initialState,
        hasOverdraft: true
      })
    })

    test("forbid overdraft", () => {
      const initialState = {
        hasOverdraft: true,
        id: 123
      }
      const resultAccount = account.config.forbidOverdraft(initialState)
      expect(resultAccount).toEqual({
        ...initialState,
        hasOverdraft: false
      })
    })

    test("toggle overdraft", () => {
      const initialState = {
        hasOverdraft: false,
        id: 123
      }
      const resultAccount = account.config.toggleOverdraft(initialState)
      expect(resultAccount).toEqual({
        ...initialState,
        hasOverdraft: true
      })
    })
  })
})
