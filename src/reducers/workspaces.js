import { merge } from '../helpers/objectHelper'

import { FETCH_WORKSPACES, RECEIVE_WORKSPACES } from '../actions/workspaces'

const defaultState = {
  isFetching: false,
  byId: {},
  allIds: []
}

const workspacesReducer = (state = defaultState, action) => {
  switch (action.type) {
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
        byId[workspace.id] = merge(state.byId[workspace.id], workspace)
      })
      return {
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
