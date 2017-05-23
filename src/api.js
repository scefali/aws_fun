import axios from 'axios';
import { formValueSelector } from 'redux-form';


const selector = formValueSelector('app');


//const baseUrl = 'https://84ymx11lba.execute-api.us-west-1.amazonaws.com/latest';
const baseUrl = 'http://localhost:2000'

const postAction = (route, data) => {
    const endpoint = baseUrl + route;
    return axios.post(endpoint, data);
}

export const sendEmail = state => {
    const { email, message } = selector(state, 'email', 'message');
    //console.log('email', email)
    return postAction('/email', { email, message })
}