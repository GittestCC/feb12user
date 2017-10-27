import jwtDecode from 'jwt-decode'

export const getTokenInfoFromLocalStorage = () => {
  const token = window.localStorage.getItem('kintohub:auth')
  if (!token) return {}
  const data = jwtDecode(token)
  // TODO: issue with data returned from server
  if (data && data.authSession) {
    data.authSession = JSON.parse(data.authSession)
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
