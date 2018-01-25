/* eslint-disable no-useless-escape */

export const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

// 8 characters min 1 number & 1 letter all valid characters, 8 characters at least
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@_'.]{8,}/

// doesn't start or end with - [although range is from 1-35 in regex, it is actually 3-35]
export const subdomainRegex = /^[^\d]([a-z\d]){1,35}$/

export const envVariableRegex = /^[^\d]([a-zA-Z\d_]){2,100}$/

/* Reuseable */
export const allCharactersAndBasicSymbolsRegex = /^[A-Za-z\d@_'\.]+$/
export const allCharactersAndBasicSymbolsSpacesRegex = /^[A-Za-z\d@_'\.\s]+$/
export const lowerCharactersRegex = /^[a-z\d]+$/
export const uppercaseRegex = /[A-Z]+/
export const notStartWithDigitRegex = /^[^\d].*$/
