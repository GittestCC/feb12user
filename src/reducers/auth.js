import { TOKEN_UPDATE, LOGOUT } from '../actions/auth'

export default function pageOptions(state = {}, action) {
  switch (action.type) {
    case TOKEN_UPDATE:
      return { token: action.token }
    case LOGOUT:
      return {}
    default:
      return state
  }
}
