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

const rootReducer = combineReducers({
  form: formReducer,
  router: routerReducer,
  pageOptions,
  kintoBlocks,
  kintoApps,
  workspaces,
  auth,
  documentation,
  kintoBlocksDependenciesCache
})
export default rootReducer
