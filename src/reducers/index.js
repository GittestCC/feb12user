import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import pageOptions from './pageOptions'
import kintoBlocks from './kintoBlocks'
import auth from './auth'

const rootReducer = combineReducers({
  form: formReducer,
  router: routerReducer,
  pageOptions,
  kintoBlocks,
  auth
})
export default rootReducer
