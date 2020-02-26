const entry = require("./entry")
const ValidationError = require("../../commons/ValidationError")
const BlockedAccountError = require("../config/BlockedAccountError")

describe("withdraw", () => {
  test("withdraw money from account", () => {
    const initialState = {
      balance: 10,
      id: 123
    }
    const AMOUNT_TO_WITHDRAW = 5
    const resultAccount = entry.withdraw(initialState, AMOUNT_TO_WITHDRAW)
    expect(resultAccount).toEqual({
      ...initialState,
      balance: 5
    })
  })

  test("does not allow withdraw when does not have enough balance", () => {
    const initialState = {
      balance: 10,
      id: 123
    }
    const AMOUNT_TO_WITHDRAW = 20
    const VALIDATION_ERROR_MSG = `Não há saldo suficiente para o saque de: ${AMOUNT_TO_WITHDRAW}`
    expect(() => entry.withdraw(initialState, AMOUNT_TO_WITHDRAW))
      .toThrow(new ValidationError(VALIDATION_ERROR_MSG))
  })

  test("withdraw when value is greater than current balance when overdraft is allowed", () => {
    const initialState = {
      balance: 10,
      hasOverdraft: true,
      id: 123
    }
    const AMOUNT_TO_WITHDRAW = 20
    const resultAccount = entry.withdraw(initialState, AMOUNT_TO_WITHDRAW)
    expect(resultAccount).toEqual({
      ...initialState,
      balance: -10
    })
  })

  test("does not allow withdraw when account is blocked", () => {
    const initialState = {
      balance: 10,
      isBlocked: true,
      id: 123
    }
    const AMOUNT_TO_WITHDRAW = 10
    const BLOCKED_ACCOUNT_ERROR_MSG = "Conta bloqueada"
    expect(() => entry.withdraw(initialState, AMOUNT_TO_WITHDRAW))
      .toThrow(new BlockedAccountError(BLOCKED_ACCOUNT_ERROR_MSG))
  })
})

describe("deposit", () => {
  test("deposit given amount", () => {
    const initialState = {
      balance: 10,
      id: 123
    }
    const AMOUNT_TO_WITHDRAW = 10
    const resultAccount = entry.deposit(initialState, AMOUNT_TO_WITHDRAW)
    expect(resultAccount).toEqual({
      ...initialState,
      balance: 20
    })
  })

  test("does not allow deposit when account is blocked", () => {
    const initialState = {
      balance: 10,
      isBlocked: true,
      id: 123
    }
    const AMOUNT_TO_DEPOSIT = 10
    const BLOCKED_ACCOUNT_ERROR_MSG = "Conta bloqueada"
    expect(() => entry.withdraw(initialState, AMOUNT_TO_DEPOSIT))
      .toThrow(new BlockedAccountError(BLOCKED_ACCOUNT_ERROR_MSG))
  })
})