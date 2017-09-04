import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import immutableCheckMiddleWare from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'

const middleware = []
middleware.push(thunk)

if (process.env.NODE_ENV === 'development') {
  middleware.push(immutableCheckMiddleWare())
}

// should always be last
if (process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger({ collapsed: true })
  middleware.push(loggerMiddleware)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default () =>
  createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))
