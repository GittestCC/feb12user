import {
  getTokenLocalStorage,
  isUserLoggedInLocalStorage
} from '../helpers/authHelper'
export default () => ({
  auth: {
    token: getTokenLocalStorage(),
    isLoggedIn: isUserLoggedInLocalStorage()
  }
})
