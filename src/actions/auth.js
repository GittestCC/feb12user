import axios from 'axios'
import { push } from 'react-router-redux'
import {
  setToken,
  setIsLoggedIn,
  getAppCredentials
} from '../helpers/authHelper'
import { AUTH } from '../constants/backendMicroservices'
import { getServerUrl } from '../helpers/urlHelper'

export const UPDATE_TOKEN = 'UPDATE_TOKEN'
export const LOGOUT = 'LOGOUT'
export const LOGIN = 'LOGIN'

export const tokenUpdate = token => {
  setToken(token)
  return {
    type: UPDATE_TOKEN,
    token
  }
}

export const login = () => {
  setIsLoggedIn(true)
  return { type: LOGIN }
}

export const logout = () => {
  setToken(null)
  setIsLoggedIn(null)
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

export const activateAccount = token => () => {
  return axios.put(getServerUrl(AUTH, '/validate'), {
    token
  })
}

export const signUp = data => dispatch => {
  return axios.post(getServerUrl(AUTH, '/register'), data).then(() => {
    dispatch(push(`/register-success?email=${data.email}`))
  })
}

export const logIn = data => dispatch => {
  return axios.post(getServerUrl(AUTH, '/login'), data).then(result => {
    dispatch(login())
    dispatch(push('/app'))
  })
}

export const authApp = () => dispatch => {
  return axios
    .post(getServerUrl(null, '/auth'), getAppCredentials())
    .then(response => {
      dispatch(tokenUpdate(response.data.token))
    })
}
