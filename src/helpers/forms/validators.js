import {
  emailRegex,
  passwordRegex,
  uppercaseRegex,
  subdomainRegex,
  lowerCharactersRegex,
  allCharactersAndBasicSymbolsRegex,
  allCharactersAndBasicSymbolsSpacesRegex,
  envVariableRegex,
  notStartWithDigitRegex
} from '../../constants/validationRules'

export const required = value => {
  if (typeof value === 'number' && !isNaN(value)) {
    return undefined
  }
  return value ? undefined : 'Required'
}

export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined

export const email = match(emailRegex, 'Invalid email address')
export const password = match(
  passwordRegex,
  'Password must contain a at least one letter and one number'
)
export const allCharactersAndBasicSymbols = match(
  allCharactersAndBasicSymbolsRegex,
  "Only the following special characters @_'. are valid"
)

export const allCharactersAndBasicSymbolsSpaces = match(
  allCharactersAndBasicSymbolsSpacesRegex,
  "Only the following special characters @_'. are valid"
)

export const subdomain = match(subdomainRegex, "Can't start with a number")

export const envVariable = match(
  envVariableRegex,
  'Can only contain characters, digits and underscores'
)
export const notStartWithDigit = match(
  notStartWithDigitRegex,
  "The first character can't be a digit"
)

export const noUppercase = noMatch(uppercaseRegex, 'Only lowercase allowed')

export const lowerCharacters = match(
  lowerCharactersRegex,
  'Only lowercase characters and digits are allowed'
)

export const unique = (collectionKey, fieldKey) => (value, formData) => {
  const collection = formData[collectionKey] || []
  return value && collection.filter(c => c[fieldKey] === value).length > 1
    ? 'Must be unique'
    : undefined
}

/* generators */

export const minValue = min => value =>
  value && value <= min ? `Must be at least ${min}` : undefined
export const maxValue = max => value =>
  value && value >= max ? `Must be less than ${max}` : undefined
export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const isBetween = (min, max) => value =>
  value && (value > max || value < min)
    ? `Must be between ${min} and ${max}`
    : undefined

// TODO related to https://github.com/erikras/redux-form/issues/3388
export const isBetween64 = isBetween(64, 262144)
export const isBetween1000 = isBetween(1, 1000)
export const isLessThan200 = maxLength(200)
export const minValue0 = minValue(0)
export const maxValue999 = maxValue(999)
export const maxLength256 = maxLength(256)

function match(regex, errorMessage) {
  return value => (value && !regex.test(value) ? errorMessage : undefined)
}

function noMatch(regex, errorMessage) {
  return value => (value && regex.test(value) ? errorMessage : undefined)
}

// used to manually validate text
export const validateRules = (text, rules) => {
  if (typeof rules === 'function') {
    rules = [rules]
  }
  return rules.reduce((old, rule) => (old ? old : rule(text)), null)
}
