import keyBy from 'lodash/keyBy'

import {
  FETCH_KINTO_APPS,
  RECEIVE_KINTO_APPS,
  RECEIVE_KINTO_APP
} from '../actions/kintoApps'

const defaultState = {
  byId: {},
  allIds: []
}

const kintoAppsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_KINTO_APPS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_KINTO_APP:
      return {
        ...state,
        isFetching: false,
        byId: {
          ...state.byId,
          [action.id]: {
            ...action.data,
            lastFetch: new Date()
          }
        }
      }
    case RECEIVE_KINTO_APPS:
      return {
        ...state,
        isFetching: false,
        byId: {
          ...state.byId,
          ...keyBy(action.data, 'id')
        },
        allIds: [...action.data.map(k => k.id)]
      }
    default:
      return state
  }
}

export default kintoAppsReducer
