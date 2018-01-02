import React from 'react'
import ReactDOM from 'react-dom'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import Immutable from 'immutable'
import ReduxThunk from 'redux-thunk'
import createHistory from 'history/createHashHistory'
import { Route, Redirect } from 'react-router'
import RedBox from 'redbox-react'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import configureStore from './store'

import './style.less'

const rootEl = document.getElementById('app')

// Create a reusable render method that we can call more than once
let render = () => {
  const store = configureStore()

  const Routes = require('./components/Routes').default
  const history = createHistory()
  const routerHistory = routerMiddleware(history)

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>,
    rootEl
  )
}

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = render
  const renderError = (error) => {
    ReactDOM.render(<RedBox error={error} />, rootEl)
  }

  // In development, we wrap the rendering function to catch errors,
  // and if something breaks, log the error and render it to the screen
  render = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  }

  // Whenever the App component file or one of its dependencies
  // is changed, re-import the updated component and re-render it
  module.hot.accept('./components/Routes', () => {
    setTimeout(render)
  })
}

export default render
