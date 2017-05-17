import React from 'react'
import ReactDOM from 'react-dom'
import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore, autoRehydrate, createTransform } from 'redux-persist-immutable'
import { Provider } from 'react-redux'
import Immutable from 'immutable'
import ReduxThunk from 'redux-thunk'

import App from './components/App'
import reducer from './reducers/reducer'


const store = createStore(
  reducer,
  undefined,
  compose(
    applyMiddleware(ReduxThunk),
    autoRehydrate()
  )
)


//we load in view from the process state
// const persistConfig = {
//     blacklist: ['view', 'secure', 'form']
// }
//persistStore(store, persistConfig)


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)