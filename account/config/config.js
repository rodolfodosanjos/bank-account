const block = initialState => ({
  ...initialState,
  isBlocked: true
})

const unblock = initialState => ({
  ...initialState,
  isBlocked: false
})

const toggleBlock = initialState => ({
  ...initialState,
  isBlocked: !initialState.isBlocked
})

const allowOverdraft = initialState => ({
  ...initialState,
  hasOverdraft: true
})

const forbidOverdraft = initialState => ({
  ...initialState,
  hasOverdraft: false
})

const toggleOverdraft = initialState => ({
  ...initialState,
  hasOverdraft: !initialState.hasOverdraft
})

module.exports = {
  block,
  unblock,
  toggleBlock,
  allowOverdraft,
  forbidOverdraft,
  toggleOverdraft
}