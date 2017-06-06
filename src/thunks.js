import Immutable from 'immutable';
import Promise from 'bluebird';
import { routerMiddleware, push } from 'react-router-redux'

import * as api from './api';


export const sendMessage = () => {
    return (dispatch, getState) => {
        const state = getState();
        api.sendMessage(state).then(response => {
            console.log('sendMessage response: ', response.data);
        })

    }
}


export const changePage = nextPage => {
    return (dispatch, getState) => {
        dispatch(push('/' + nextPage))
    }
}

export const subscribe = () => {
    return (dispatch, getState) => {
        //FIXME
    }
}