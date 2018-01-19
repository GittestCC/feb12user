import jwtDecode from 'jwt-decode'

export const getTokenInfoFromLocalStorage = () => {
  let token = window.localStorage.getItem('kintohub:auth')
  if (!token) return {}
  let data = {}
  try {
    data = jwtDecode(token)
    if (data && data.authSession) {
      data.authSession = JSON.parse(data.authSession)
    }
  } catch (e) {
    setToken(null)
    data = {}
    token = null
  }
  return {
    ...data,
    token
  }
}

export const setToken = token => {
  if (token) {
    try {
      jwtDecode(token)
      window.localStorage.setItem('kintohub:auth', token)
      return true
    } catch (e) {
      console.error('Invalid token ', token)
      return false
    }
  } else {
    window.localStorage.removeItem('kintohub:auth')
  }
}

export const isAuthenticated = auth => {
  if (!auth || !auth.groups) {
    return false
  }
  if (typeof auth.groups === 'string') {
    return auth.groups === 'AuthedUser'
  }
  return auth.groups.some(g => g === 'AuthedUser')
}
