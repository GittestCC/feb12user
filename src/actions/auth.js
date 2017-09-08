import { setToken as localStorageSetToken } from '../helpers/authHelper'
export const TOKEN_UPDATE = 'TOKEN_UPDATE'
export const LOGOUT = 'LOGOUT'

export const setToken = token => dispatch => {
  localStorageSetToken(token)
  dispatch({ type: TOKEN_UPDATE, token })
}

export const logout = () => ({ type: LOGOUT })
