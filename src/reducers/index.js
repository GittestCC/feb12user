import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import pageOptions from './pageOptions'
import kintoblocks from './kintoblocks'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  form: formReducer,
  router: routerReducer,
  pageOptions,
  kintoblocks
})
export default rootReducer
