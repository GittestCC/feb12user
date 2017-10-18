import keyBy from 'lodash/keyBy'

import {
  FETCH_KINTO_BLOCKS,
  RECEIVE_KINTO_BLOCKS,
  RECEIVE_KINTO_BLOCK,
  CREATE_VERSION_KINTO_BLOCK,
  UPDATE_KINTO_BLOCK
} from '../actions/kintoBlocks'

const defaultState = {
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
    case RECEIVE_KINTO_BLOCKS:
      return {
        ...state,
        isFetching: false,
        byId: {
          ...state.byId,
          ...keyBy(action.data.blocks, 'id')
        },
        allIds: [...action.data.blocks.map(k => k.id)]
      }
    case CREATE_VERSION_KINTO_BLOCK:
    case RECEIVE_KINTO_BLOCK:
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

    default:
      return state
  }
}

export default kintoBlocksReducer
