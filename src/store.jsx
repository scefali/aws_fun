import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import createHistory from 'history/createHashHistory'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers'

export default function configureStore(preloadedState) {
  const browserHistory = createHistory()
  const middlewares = [ ReduxThunk, routerMiddleware(browserHistory) ]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const storeEnhancers = [ middlewareEnhancer ]
  const composedEnhancer = composeWithDevTools(...storeEnhancers)
  const store = createStore(reducer, preloadedState, composedEnhancer)
  return store
}
