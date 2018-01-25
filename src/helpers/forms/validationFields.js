import {
  required,
  allCharactersAndBasicSymbols,
  allCharactersAndBasicSymbolsSpaces,
  email as emailValidation,
  minLength,
  maxLength,
  password,
  lowerCharacters,
  subdomain,
  envVariable,
  notStartWithDigit
} from './validators'
/* add all the fields that have multiple validation rules */

/* reuseable fields */
export const basicInput = [minLength(3), allCharactersAndBasicSymbolsSpaces]

export const email = [required, emailValidation]
export const kintoName = [
  required,
  minLength(3),
  maxLength(35),
  lowerCharacters,
  notStartWithDigit,
  subdomain
]

/* pages */
export const environments = {
  envVariableName: [
    required,
    minLength(3),
    maxLength(100),
    notStartWithDigit,
    envVariable
  ],
  envName: kintoName
}

export const signup = {
  username: [
    required,
    minLength(3),
    maxLength(35),
    allCharactersAndBasicSymbols
  ],
  password: [
    required,
    allCharactersAndBasicSymbols,
    maxLength(20),
    minLength(8),
    password
  ]
}

export const workspaces = {}
