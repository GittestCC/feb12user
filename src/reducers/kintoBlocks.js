import {
  FETCH_KINTO_BLOCKS,
  RECEIVE_KINTO_BLOCKS,
  RECEIVE_KINTO_BLOCK,
  CREATE_TAG_KINTO_BLOCK,
  UPDATE_KINTO_BLOCK
} from '../actions/kintoBlocks'

import { SELECT_WORKSPACE } from '../actions/workspaces'

const defaultState = {
  isFetching: false,
  byId: {},
  allIds: []
}

const kintoBlocksReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_KINTO_BLOCKS:
      return {
        ...state,
        isFetching: true
      }
    case CREATE_TAG_KINTO_BLOCK:
    case RECEIVE_KINTO_BLOCK: {
      const allIds =
        state.allIds.indexOf(action.id) === -1
          ? [...state.allIds, action.id]
          : state.allIds
      return {
        ...state,
        isFetching: false,
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
    case RECEIVE_KINTO_BLOCKS: {
      let allIds = []
      let byId = {}
      action.data.forEach(block => {
        allIds.push(block.id)
        byId[block.id] = {
          ...state.byId[block.id],
          ...block
        }
      })
      return {
        isFetching: false,
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
