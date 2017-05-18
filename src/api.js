import axios from 'axios';
import { formValueSelector } from 'redux-form';


const selector = formValueSelector('app');


const baseUrl = 'https://w5uej9ixo5.execute-api.us-west-1.amazonaws.com/dev';


const postAction = (route, data) => {
    const endpoint = baseUrl + route;
    return axios.post(endpoint, data);
}

export const sendEmail = state => {
    const { email, message } = selector(state, 'email', 'message');
    postAction('/email', { email, message })
}