import { getTokenInfoFromLocalStorage } from '../helpers/authHelper'
export default () => ({
  auth: {
    ...getTokenInfoFromLocalStorage()
  }
})
