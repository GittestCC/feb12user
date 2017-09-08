export const getToken = () => {
  return window.localStorage.getItem('kintohub:auth')
}

export const setToken = token => {
  window.localStorage.setItem('kintohub:auth', token)
}
