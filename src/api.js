import axios from 'axios';
import { formValueSelector, getFormValues } from 'redux-form/immutable';


const messageSelector = formValueSelector('message');

const local = 1;

const remoteUrl = 'https://84ymx11lba.execute-api.us-west-1.amazonaws.com/latest';
const localUrl = 'http://localhost:2000';
const baseUrl = local ? localUrl : remoteUrl;

const postAction = (route, data) => {
    const endpoint = baseUrl + route;
    console.log('url', endpoint)
    return axios.post(endpoint, data);
}

export const sendMessage = state => {
    const { message, subject } = messageSelector(state, 'message', 'subject');
    return postAction('/sendMessage', { message, subject })
}