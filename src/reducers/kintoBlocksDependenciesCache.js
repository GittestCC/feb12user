import {
  RECEIVE_KINTO_BLOCK,
  RECEIVE_KINTO_BLOCK_DEPENDENCIES
} from '../actions/kintoBlocks'
import { RECEIVE_KINTO_APP, RECEIVE_KINTO_APPS } from '../actions/kintoApps'
import { isDependencySimple } from '../helpers/kintoBlocksHelper'

const kintoBlocksDependenciesCacheReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_KINTO_APPS:
    case RECEIVE_KINTO_APP:
    case RECEIVE_KINTO_BLOCK:
    case RECEIVE_KINTO_BLOCK_DEPENDENCIES:
      if (!action.metadata || !action.metadata.dependencies) {
        return state
      }
      let newState = { ...state }
      let { dependencies } = action.metadata
      Object.keys(dependencies).forEach(d => {
        // don't overwrite the detailed info if
        // state has already a detailed copy of an item
        // and the retrieved item is simple
        if (
          state[d] &&
          !isDependencySimple(state[d]) &&
          isDependencySimple(dependencies[d])
        ) {
          dependencies[d].versions = state[d].versions
          dependencies[d].dependencies = state[d].dependencies
        }
        newState[d] = dependencies[d]
      })
      return newState
    default:
      return state
  }
}

export default kintoBlocksDependenciesCacheReducer
