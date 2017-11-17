import {
  FETCH_WORKSPACES,
  RECEIVE_WORKSPACES,
  SELECT_WORKSPACE
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
    default:
      return state
  }
}

export default workspacesReducer
