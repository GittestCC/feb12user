import keyBy from 'lodash/keyBy'

import {
  FETCH_KINTO_BLOCKS,
  RECEIVE_KINTO_BLOCKS
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
          ...keyBy(action.data, 'id')
        },
        allIds: [...action.data.map(k => k.id)]
      }
    default:
      return state
  }
}

export default kintoBlocksReducer
