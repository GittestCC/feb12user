import { arrayMove } from 'react-sortable-hoc'
import { merge } from '../helpers/objectHelper'

import {
  RECEIVE_KINTO_APPS,
  RECEIVE_KINTO_APP,
  UPDATE_KINTO_APP,
  ADD_KINTO_APP,
  RECIEVE_KINTO_APP_ENVIRONMENTS,
  RECEIVE_KINTO_APP_DEPENDENCIES_CONFIG,
  KINTO_APP_ENVIRONMENT_LIST_REORDER,
  NEW_ENVIRONMENT_RECEIVE,
  ADD_TAG,
  KINTO_APP_ENVIRONMENT_UPDATE,
  KINTO_APP_ENVIRONMENT_LOG_UPDATE,
  KINTO_APP_CHANGELOG_RECEIVE
} from '../actions/kintoApps'

import { SELECT_WORKSPACE } from '../actions/workspaces'

const defaultState = {
  byId: {},
  allIds: []
}

const kintoAppsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_KINTO_APP: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: action.willOverwrite
            ? action.data
            : merge(state.byId[action.id], action.data)
        }
      }
    }

    case ADD_KINTO_APP: {
      return {
        allIds: [...state.allIds, action.id],
        byId: {
          ...state.byId,
          [action.id]: action.data
        }
      }
    }

    case RECEIVE_KINTO_APPS: {
      let allIds = []
      let byId = {}
      action.data.forEach(app => {
        allIds.push(app.id)
        byId[app.id] = app
      })
      return {
        byId,
        allIds
      }
    }
    case RECIEVE_KINTO_APP_ENVIRONMENTS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            environments: action.data
          }
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
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            environments: [...state.byId[action.id].environments, action.data]
          }
        }
      }

    case ADD_TAG:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            versions: [
              ...state.byId[action.id].versions,
              { name: action.name, type: action.versionType }
            ]
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
          [action.id]: action.data
        }
      }

    case KINTO_APP_ENVIRONMENT_LOG_UPDATE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            selectedLog: {
              envId: action.envId,
              releaseVersion: action.releaseVersion,
              logs: action.data
            }
          }
        }
      }
    case KINTO_APP_CHANGELOG_RECEIVE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            changelog: {
              oldVersion: action.oldVersion,
              newVersion: action.newVersion,
              data: action.data
            }
          }
        }
      }
    case SELECT_WORKSPACE:
      return defaultState
    default:
      return state
  }
}

export default kintoAppsReducer
