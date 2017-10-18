import keyBy from 'lodash/keyBy'
import { arrayMove } from 'react-sortable-hoc'

import {
  FETCH_KINTO_APPS,
  RECEIVE_KINTO_APPS,
  RECEIVE_KINTO_APP,
  RECIEVE_KINTO_APP_ENVIRONMENTS,
  KINTO_APP_ENVIRONMENT_LIST_REORDER,
  NEW_ENVIRONMENT_RECEIVE,
  KINTO_APP_ENVIRONMENT_UPDATE
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
    case KINTO_APP_ENVIRONMENT_LIST_REORDER:
      const oldOrder = [...state.byId[action.id].environments]
      return {
        ...state,
        isFetching: false,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            environments: arrayMove(oldOrder, action.oldIndex, action.newIndex)
          }
        }
      }
    case NEW_ENVIRONMENT_RECEIVE:
      return {
        ...state,
        isFetching: false,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            environments: [...state.byId[action.id].environments, action.data]
          }
        }
      }

    case KINTO_APP_ENVIRONMENT_UPDATE:
      const { data } = action
      const updatedEnvironments = state.byId[action.id].environments.map(i => {
        if (i.id !== data.id) {
          return i
        }
        return {
          ...i,
          ...data
        }
      })

      return {
        ...state,
        isFetching: false,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            environments: updatedEnvironments
          }
        }
      }
    default:
      return state
  }
}

export default kintoAppsReducer
