import axios from 'axios';
import { formValueSelector, getFormValues } from 'redux-form/immutable';


const selector = formValueSelector('app');

const local = 1;

const remoteUrl = 'https://84ymx11lba.execute-api.us-west-1.amazonaws.com/latest';
const localUrl = 'http://localhost:2000';
const baseUrl = local ? localUrl : remoteUrl;

const postAction = (route, data) => {
    const endpoint = baseUrl + route;
    return axios.post(endpoint, data);
}

export const sendEmail = state => {
    const { email, message, subject } = selector(state, 'email', 'message', 'subject');
    return postAction('/sendEmail', { email, message, subject })
}