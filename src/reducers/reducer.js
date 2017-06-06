import { combineReducers } from 'redux-immutable'
import Immutable from 'immutable'
import { reducer as formReducer, getFormValues } from 'redux-form/immutable';
import { REHYDRATE } from 'redux-persist/constants';
import { routerReducer } from 'react-router-redux'
import * as _ from 'lodash';

//import mainReducer from './mainReducer'


const reducers = {
    form: formReducer,
    router: routerReducer
}

const combined = combineReducers(reducers);

const reducer = (state = Immutable.fromJS({}), action) => {
    //console.log('state', state.toJS());
    //console.log('action', action)
    console.log('route', state.toJS().router)
    return combined(state, action);
}

export default reducer