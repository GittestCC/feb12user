import { createStore, applyMiddleware } from 'redux'
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
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

export default () => createStoreWithMiddleware(rootReducer)
