export const required = value => {
  if (typeof value === 'number' && !isNaN(value)) {
    return undefined
  }
  return value ? undefined : 'Required'
}
export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined
export const isBetween = (min, max) => value =>
  value && (value > max || value < min)
    ? `Must be between ${min} and ${max}`
    : undefined
export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

// TODO remove when fixed and make the validation inline
// bug https://github.com/erikras/redux-form/issues/3388

export const isBetween64 = isBetween(64, 262144)
export const isBetween1000 = isBetween(1, 1000)
export const password = value =>
  value && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(value)
    ? 'Password must contain a minimum of eight characters, at least one letter and one number'
    : undefined
