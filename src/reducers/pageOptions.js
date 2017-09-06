import { actionTypes } from 'redux-form'
import { LOCATION_CHANGE } from 'react-router-redux'
import { getActivePageKey } from '../helpers/pageHelper'

export default function pageOptions(state = {}, action) {
  switch (action.type) {
    case actionTypes.CHANGE:
      return {
        ...state,
        canSave: true
      }
    case LOCATION_CHANGE:
      const url = action.payload.pathname
      const isDashboard = !url.startsWith('/app/market')
      const activePage = getActivePageKey(url, isDashboard)
      return {
        ...state,
        canSave: false,
        activePage,
        isDashboard
      }
    default:
      return state
  }
}
