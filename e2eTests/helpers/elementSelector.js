export const getInput = (selector, type = 'input') => ({
  input: browser.element(`[data-test=${selector}] ${type}`),
  error: browser.element(`[data-test=${selector}] .error-message`)
})

export const getDataTest = selector =>
  browser.element(`[data-test=${selector}]`)
