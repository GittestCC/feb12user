import { TOKEN_UPDATE_INFO, LOGOUT } from '../actions/auth'

export default function pageOptions(state = {}, action) {
  switch (action.type) {
    case TOKEN_UPDATE_INFO:
      return action.data
    case LOGOUT:
      return {}
    default:
      return state
  }
}
