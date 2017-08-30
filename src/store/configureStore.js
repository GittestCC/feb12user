import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import immutableCheckMiddleWare from 'redux-immutable-state-invariant'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers'
import sagas from '../sagas'

const middleware = []
const sagaMiddleware = createSagaMiddleware()
middleware.push(sagaMiddleware)

if (process.env.NODE_ENV === 'development') {
  middleware.push(immutableCheckMiddleWare())
}

// should always be last
if (process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger({ collapsed: true })
  middleware.push(loggerMiddleware)
}
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
export default function configureStore() {
  const store = createStoreWithMiddleware(rootReducer)
  sagaMiddleware.run(sagas)
  return store
}
