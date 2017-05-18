import Immutable from 'immutable';
import Promise from 'bluebird';

import * as api from './api';


export const sendEmail = () => {
    return (dispatch, getState) => {
        const state = getState();
        api.sendEmail(state);

    }
}