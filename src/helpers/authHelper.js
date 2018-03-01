export const getTokenLocalStorage = () => {
  return window.localStorage.getItem('kintohub:auth')
}

export const isUserLoggedInLocalStorage = () => {
  return !!window.localStorage.getItem('kintohub:auth:isloggedin')
}

export const setToken = token => {
  if (token) {
    window.localStorage.setItem('kintohub:auth', token)
  } else {
    window.localStorage.removeItem('kintohub:auth')
  }
}

export const setIsLoggedIn = isLoggedIn => {
  if (isLoggedIn) {
    window.localStorage.setItem('kintohub:auth:isloggedin', true)
  } else {
    window.localStorage.removeItem('kintohub:auth:isloggedin')
  }
}

export const getAppCredentials = () => {
  const { REACT_APP_AUTH_APP_ID, REACT_APP_AUTH_APP_SECRET } = process.env
  return {
    clientId: REACT_APP_AUTH_APP_ID,
    clientSecret: REACT_APP_AUTH_APP_SECRET
  }
}
