import { getToken } from '../helpers/authHelper'
export default () => ({
  auth: {
    token: getToken()
  }
})
