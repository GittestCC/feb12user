import { combineReducers } from 'redux'

// TODO: test reducer
const appReducer = (state = {}, action) => {
  switch (action) {
    default:
      return {}
  }
}

const rootReducer = combineReducers({ appReducer })
export default rootReducer
