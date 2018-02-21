import {
  FETCH_WORKSPACES,
  RECEIVE_WORKSPACES,
  RECEIVE_WORKSPACE,
  SELECT_WORKSPACE,
  RECEIVE_SERVICE
} from '../actions/workspaces'

const defaultState = {
  isFetching: false,
  selectedWorkspace: null,
  byId: {},
  allIds: []
}

const workspacesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SELECT_WORKSPACE:
      return {
        ...state,
        selectedWorkspace: action.id
      }
    case FETCH_WORKSPACES:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_WORKSPACES: {
      let allIds = []
      let byId = {}
      action.data.forEach(workspace => {
        allIds.push(workspace.id)
        byId[workspace.id] = workspace
      })
      return {
        ...state,
        isFetching: false,
        byId,
        allIds
      }
    }
    case RECEIVE_WORKSPACE: {
      const workspace = action.data
      const members = workspace.members.concat().sort((a, b) => a.role > b.role)
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            ...workspace,
            members
          }
        }
      }
    }
    case RECEIVE_SERVICE: {
      const service = action.data
      const workspace = state.byId[action.id]
      const services = workspace.services.filter(
        item => item.service !== service.service
      )
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            services: [...services, service]
          }
        }
      }
    }
    default:
      return state
  }
}

export default workspacesReducer
