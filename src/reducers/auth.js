import { TOKEN_UPDATE_FROM_LOCAL_STORAGE, LOGOUT } from '../actions/auth'
import { getTokenInfoFromLocalStorage } from '../helpers/authHelper'

export default function pageOptions(state = {}, action) {
  switch (action.type) {
    case TOKEN_UPDATE_FROM_LOCAL_STORAGE:
      return getTokenInfoFromLocalStorage()
    case LOGOUT:
      return {}
    default:
      return state
  }
}
