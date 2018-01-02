import { combineReducers } from 'redux-immutable'
import Immutable from 'immutable'
import { reducer as formReducer, getFormValues } from 'redux-form/immutable'
import { REHYDRATE } from 'redux-persist/constants'
// import { routerReducer } from 'react-router-redux'
import * as _ from 'lodash'

import subscribeReducer from './subscribeReducer'
import messageReducer from './messageReducer'
import routerReducer from './customRouterReducer'


const reducers = {
    form: formReducer,
    router: routerReducer,
    subscribe: subscribeReducer,
    message: messageReducer
}

const combined = combineReducers(reducers)

const reducer = (state = Immutable.fromJS({}), action) => {
    return combined(state, action)
}

export default reducer