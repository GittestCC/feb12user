import { setToken as localStorageSetToken } from '../helpers/authHelper'
import { push } from 'react-router-redux'
export const TOKEN_UPDATE = 'TOKEN_UPDATE'
export const LOGOUT = 'LOGOUT'

export const setToken = token => dispatch => {
  localStorageSetToken(token)
  dispatch({ type: TOKEN_UPDATE, token })
}

export const logout = () => ({ type: LOGOUT })

export const forgotPassword = (data, callback) => () => {
  // TODO Ajax party hurr!
  return Promise.resolve('forgot password success').then(() => {
    return callback()
  })
}

export const createNewPassword = data => dispatch => {
  // TODO Ajax was invited to this party too!
  return Promise.resolve('new password created').then(() => {
    dispatch(push('/'))
  })
}

export const signUp = (data, callback) => () => {
  // TODO more AJAX!
  return Promise.resolve(' sign up success ').then(() => {
    return callback(data.emailAddress)
  })
}

export const logIn = (data, callback) => dispatch => {
  // TODO more AJAX for log in!
  return Promise.resolve(' log in success ').then(() => {
    dispatch(push('/'))
  })
}
