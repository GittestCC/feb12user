import { UPDATE_TOKEN, LOGOUT, LOGIN } from '../actions/auth'

export default function pageOptions(state = {}, action) {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {
        token: action.token
      }
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true
      }
    case LOGOUT:
      return {}
    default:
      return state
  }
}
