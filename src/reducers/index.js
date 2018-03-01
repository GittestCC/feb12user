import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import pageOptions from './pageOptions'
import kintoBlocks from './kintoBlocks'
import kintoApps from './kintoApps'
import workspaces from './workspaces'
import documentation from './documentation'
import auth from './auth'
import kintoBlocksDependenciesCache from './kintoBlocksDependenciesCache'
import currentUser from './currentUser'

const rootReducer = combineReducers({
  form: formReducer,
  router: routerReducer,
  pageOptions,
  kintoBlocks,
  kintoApps,
  workspaces,
  auth,
  documentation,
  kintoBlocksDependenciesCache,
  currentUser
})
export default rootReducer
