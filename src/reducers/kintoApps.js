import keyBy from 'lodash/keyBy'

import {
  FETCH_KINTO_APPS,
  RECEIVE_KINTO_APPS,
  RECEIVE_KINTO_APP,
  RECIEVE_KINTO_APP_ENVIRONMENTS
} from '../actions/kintoApps'

const defaultState = {
  byId: {},
  allIds: [],
  dependencyStore: {}
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
    case RECIEVE_KINTO_APP_ENVIRONMENTS:
      return {
        ...state,
        isFetching: false,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            environments: action.data
          }
        }
      }
    default:
      return state
  }
}

export default kintoAppsReducer
