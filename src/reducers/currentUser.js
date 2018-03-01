import { RECEIVE_CURRENT_USER_INFO } from '../actions/currentUser'

const defaultState = {
  isBasicLoaded: false
}

export default function currentUser(state = defaultState, action) {
  switch (action.type) {
    default:
      return state
    case RECEIVE_CURRENT_USER_INFO:
      return {
        isBasicLoaded: true,
        ...action.data
      }
  }
}
