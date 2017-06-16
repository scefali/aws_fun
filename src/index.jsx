import React from 'react'
import ReactDOM from 'react-dom'
import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore, autoRehydrate, createTransform } from 'redux-persist-immutable'
import { Provider } from 'react-redux'
import Immutable from 'immutable'
import ReduxThunk from 'redux-thunk'
import createHistory from 'history/createHashHistory'
import { Route, Redirect } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import Subscribe from './components/Subscribe'
import Message from './components/Message'
import Topic from './components/Topic'
import reducer from './reducers/reducer'



const history = createHistory()
const routerHistory = routerMiddleware(history)


const store = createStore(
  reducer,
  undefined,
  compose(
    applyMiddleware(ReduxThunk),
    applyMiddleware(routerHistory),
    autoRehydrate()
  )
)



ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <h1>AWS Fun</h1>
          <Route exact path="/subscribe" component={Subscribe}/>
          <Route exact path="/message" component={Message}/>
          <Route exact path="/Topic" component={Topic}/>
          <Route exact path="/*" render={() => ( <Redirect to="/Topic"/> )} />
        </div>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
)