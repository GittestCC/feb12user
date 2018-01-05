import { arrayMove } from 'react-sortable-hoc'
import { merge } from '../helpers/objectHelper'

import {
  FETCH_KINTO_APPS,
  RECEIVE_KINTO_APPS,
  RECEIVE_KINTO_APP,
  UPDATE_KINTO_APP,
  RECIEVE_KINTO_APP_ENVIRONMENTS,
  RECEIVE_KINTO_APP_DEPENDENCIES_CONFIG,
  KINTO_APP_ENVIRONMENT_LIST_REORDER,
  NEW_ENVIRONMENT_RECEIVE,
  KINTO_APP_ENVIRONMENT_UPDATE
} from '../actions/kintoApps'

const defaultState = {
  isFetching: false,
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
    case RECEIVE_KINTO_APP: {
      const allIds =
        state.allIds.indexOf(action.id) === -1
          ? [...state.allIds, action.id]
          : state.allIds
      return {
        isFetching: false,
        byId: {
          ...state.byId,
          [action.id]: merge(state.byId[action.id], action.data)
        },
        allIds
      }
    }
    case RECEIVE_KINTO_APPS: {
      let allIds = []
      let byId = {}
      action.data.forEach(app => {
        allIds.push(app.id)
        byId[app.id] = merge(state.byId[app.id], app, {
          // if there is already a version saved for that kintoapp we don't want to overwrite that
          lowPriority: 'version'
        })
      })
      return {
        isFetching: false,
        byId,
        allIds
      }
    }
    case RECIEVE_KINTO_APP_ENVIRONMENTS:
      return {
        ...state,
        isFetching: false,
        byId: {
          ...state.byId,
          [action.id]: merge(state.byId[action.id], {
            environments: action.data // TODO: remove missing env
          })
        }
      }
    case RECEIVE_KINTO_APP_DEPENDENCIES_CONFIG:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            dependenciesConfig: {
              envId: action.envId,
              version: action.ver,
              data: action.data
            }
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
    case UPDATE_KINTO_APP:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: merge(state.byId[action.id], action.data)
        }
      }
    default:
      return state
  }
}

export default kintoAppsReducer
