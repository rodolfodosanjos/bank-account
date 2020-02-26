const config = require("./config")

describe("block", () => {
  test("block", () => {
    const initialState = {
      isBlocked: false,
      id: 123
    }
    const configResult = config.block(initialState)
    expect(configResult).toEqual({
      ...initialState,
      isBlocked: true
    })
  })

  test("block when already is blocked", () => {
    const initialState = {
      isBlocked: true,
      id: 123
    }
    const configResult = config.block(initialState)
    expect(configResult).toEqual({
      ...initialState,
      isBlocked: true
    })
  })
})

describe("unblock", () => {
  test("unblock", () => {
    const initialState = {
      isBlocked: true,
      id: 123
    }
    const configResult = config.unblock(initialState)
    expect(configResult).toEqual({
      ...initialState,
      isBlocked: false
    })
  })

  test("unblock when already is NOT blocked", () => {
    const initialState = {
      isBlocked: false,
      id: 123
    }
    const configResult = config.unblock(initialState)
    expect(configResult).toEqual({
      ...initialState,
      isBlocked: false
    })
  })
})

describe("toggle block", () => {
  test("toggle block when is blocked", () => {
    const initialState = {
      isBlocked: true,
      id: 123
    }
    const configResult = config.toggleBlock(initialState)
    expect(configResult).toEqual({
      ...initialState,
      isBlocked: false
    })
  })

  test("toggle block when is NOT blocked", () => {
    const initialState = {
      isBlocked: false,
      id: 123
    }
    const configResult = config.toggleBlock(initialState)
    expect(configResult).toEqual({
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
    const configResult = config.allowOverdraft(initialState)
    expect(configResult).toEqual({
      ...initialState,
      hasOverdraft: true
    })
  })

  test("allow overdraft when already has it", () => {
    const initialState = {
      hasOverdraft: true,
      id: 123
    }
    const configResult = config.allowOverdraft(initialState)
    expect(configResult).toEqual({
      ...initialState,
      hasOverdraft: true
    })
  })
})

describe("forbid overdraft", () => {
  test("forbid overdraft", () => {
    const initialState = {
      hasOverdraft: true,
      id: 123
    }
    const configResult = config.forbidOverdraft(initialState)
    expect(configResult).toEqual({
      ...initialState,
      hasOverdraft: false
    })
  })

  test("forbid when is allowed", () => {
    const initialState = {
      hasOverdraft: false,
      id: 123
    }
    const configResult = config.forbidOverdraft(initialState)
    expect(configResult).toEqual({
      ...initialState,
      hasOverdraft: false
    })
  })
})

describe("toggle overdraft", () => {
  test("toggle overdraft when is allowed", () => {
    const initialState = {
      hasOverdraft: true,
      id: 123
    }
    const configResult = config.toggleOverdraft(initialState)
    expect(configResult).toEqual({
      ...initialState,
      hasOverdraft: false
    })
  })

  test("toggle block when is NOT blocked", () => {
    const initialState = {
      hasOverdraft: false,
      id: 123
    }
    const configResult = config.toggleOverdraft(initialState)
    expect(configResult).toEqual({
      ...initialState,
      hasOverdraft: true
    })
  })
})