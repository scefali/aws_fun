import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/browser';
import { Provider } from 'react-redux'
import createHistory from 'history/createHashHistory'
import { Router } from 'react-router'
import RedBox from 'redbox-react'
import { routerMiddleware, push, syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store'

import './style.less'

console.log('window.SENTRY_DSN', window.SENTRY_DSN)
Sentry.init({dsn: window.SENTRY_DSN});


const rootEl = document.getElementById('app')

const createSelectLocationState = () => {
  let prevRoutingState, prevRoutingStateJS
  return (state) => {
    const routingState = state.get('router') // or state.routing
    if (typeof prevRoutingState === 'undefined' || prevRoutingState !== routingState) {
      prevRoutingState = routingState
      prevRoutingStateJS = routingState.toJS()
    }
    return prevRoutingStateJS
  }
}

// Create a reusable render method that we can call more than once
let render = () => {
  const store = configureStore()
  // Dynamically import our main App component, and render it
  const Routes = require('./components/Routes').default
  const history = syncHistoryWithStore(createHistory(), store, {
    selectLocationState: createSelectLocationState
  })
  history.transitionTo = history.confirmTransitionTo

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Routes topLocation={history.location} />
      </Router>
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
