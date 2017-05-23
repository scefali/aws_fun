import axios from 'axios';
import { formValueSelector } from 'redux-form';


const selector = formValueSelector('app');


const baseUrl = 'https://qckt5va6l2.execute-api.us-west-1.amazonaws.com/latest';


const postAction = (route, data) => {
    const endpoint = baseUrl + route;
    return axios.post(endpoint, data);
}

export const sendEmail = state => {
    const { email, message } = selector(state, 'email', 'message');
    return postAction('/email', { email, message })
}