import {
  RECEIVE_KINTO_BLOCKS,
  RECEIVE_KINTO_BLOCK,
  ADD_KINTO_BLOCK,
  CREATE_TAG_KINTO_BLOCK,
  UPDATE_KINTO_BLOCK
} from '../actions/kintoBlocks'

import { SELECT_WORKSPACE } from '../actions/workspaces'

const defaultState = {
  byId: {},
  allIds: []
}

const kintoBlocksReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_TAG_KINTO_BLOCK:
    case RECEIVE_KINTO_BLOCK: {
      const allIds =
        state.allIds.indexOf(action.id) === -1
          ? [...state.allIds, action.id]
          : state.allIds
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            ...action.data
          }
        },
        allIds
      }
    }
    case ADD_KINTO_BLOCK: {
      return {
        allIds: [...state.allIds, action.id],
        byId: {
          ...state.byId,
          [action.id]: action.data
        }
      }
    }
    case RECEIVE_KINTO_BLOCKS: {
      let allIds = []
      let byId = {}
      action.data.forEach(block => {
        allIds.push(block.id)
        byId[block.id] = block
      })
      return {
        byId,
        allIds
      }
    }
    case UPDATE_KINTO_BLOCK:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            ...action.data
          }
        }
      }

    case SELECT_WORKSPACE:
      return defaultState

    default:
      return state
  }
}

export default kintoBlocksReducer
