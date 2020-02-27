const ValidationError = require("../../commons/error/ValidationError")
const BlockedAccountError = require("../config/BlockedAccountError")

const withdraw = (initialState, amountToWithdraw) => {
  if (!initialState.hasOverdraft &&
    initialState.balance < amountToWithdraw) {
    const ERROR_MSG = `Não há saldo suficiente para o saque de: ${amountToWithdraw}`
    throw new ValidationError(ERROR_MSG)
  }

  if (initialState.isBlocked) {
    const BLOCKED_ACCOUNT_ERROR_MSG = "Conta bloqueada"
    throw new BlockedAccountError(BLOCKED_ACCOUNT_ERROR_MSG)
  }

  return {
    ...initialState,
    balance: initialState.balance - amountToWithdraw  
  }
}

const deposit = (initialState, amountToDeposit) => ({
  ...initialState,
  balance: initialState.balance + amountToDeposit
})

module.exports = {
  withdraw,
  deposit
}