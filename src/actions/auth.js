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

export const forgotPassword = (data, onSuccess) => dispatch => {
  return axios
    .post(getServerUrl(AUTH, '/requestResetPassword'), {
      userName: data.forgotPassword
    })
    .then(onSuccess)
}

export const createNewPassword = (data, token) => dispatch => {
  return axios
    .put(getServerUrl(AUTH, '/resetPassword'), {
      token: token,
      newPassword: data.createNewPassword
    })
    .then(() => {
      dispatch(push('/login'))
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
  return pureLogin(data, dispatch).then(null, async r => {
    //TODO: change the backend to send a flag instead of an error message
    if (
      r.response.data &&
      r.response.data.error === 'Cannot login when already logged in!'
    ) {
      await dispatch(authApp())
      return pureLogin(data, dispatch)
    }
  })
}

export const authApp = () => dispatch => {
  return axios
    .post(getServerUrl(null, '/auth'), getAppCredentials())
    .then(response => {
      dispatch(tokenUpdate(response.data.token))
    })
}

const pureLogin = (data, dispatch) => {
  return axios.post(getServerUrl(AUTH, '/login'), data).then(() => {
    dispatch(login())
    dispatch(push('/app'))
  })
}
