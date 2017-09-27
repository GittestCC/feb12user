import axios from 'axios'
import { push } from 'react-router-redux'
import { SubmissionError } from 'redux-form'
import { setToken as localStorageSetToken } from '../helpers/authHelper'

export const TOKEN_UPDATE_FROM_LOCAL_STORAGE = 'TOKEN_UPDATE'
export const LOGOUT = 'LOGOUT'

export const setToken = token => {
  localStorageSetToken(token)
  return { type: TOKEN_UPDATE_FROM_LOCAL_STORAGE }
}

export const logout = () => {
  localStorageSetToken(null)
  return { type: LOGOUT }
}

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

export const validatePassword = (email, token) => () => {
  return axios.put('/auth/validate', {
    email,
    token
  })
}

export const signUp = (data, callback) => dispatch => {
  return axios.post('/auth/register', data).then(
    result => {
      //TODO use proper email validation
      return dispatch(
        validatePassword(data.email, result.debugVerificationToken)
      ).then(() => {
        return callback(data.emailAddress)
      })
    },
    err => {
      if (err.errors) {
        throw new SubmissionError(err.errors)
      }
    }
  )
}

export const logIn = data => dispatch => {
  return axios.put('/auth/login', data).then(
    () => {
      dispatch(push('/app'))
    },
    err => {
      if (err.errors) {
        throw new SubmissionError(err.errors)
      }
    }
  )
}
