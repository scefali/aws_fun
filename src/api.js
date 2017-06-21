import axios from 'axios'

import * as util from './util'


const local = 1

const remoteUrl = 'https://84ymx11lba.execute-api.us-west-1.amazonaws.com/latest'
const localUrl = 'http://localhost:2000'
const baseUrl = local ? localUrl : remoteUrl



const apiAction = (route, data, verb) => {
    const endpoint = baseUrl + route
    console.log(verb, endpoint, data)
    return axios[verb](endpoint, data)
}

const apiPost = (route, data) => {
    return apiAction(route, data, 'post')
}

const apiDelete = (route, data) => {
    return apiAction(route, data, 'delete')
}

//FIXME
// export const sendMessage = state => {
//     const { message, subject } = util.messageSelector(state, 'message', 'subject')
//     return apiPost('/sendMessage', { message, subject })
// }

// export const subscribe = state => {
//     const { action, email } = util.subscribeSelector(state, 'action', 'email')
//     const endpoint = `/${action}Email`
//     return apiPost(endpoint, { email })
// }

export const topic = state => {
    const { topicAction, topicName } = util.topicSelector(state, 'topicAction', 'topicName')

    let verb = 'post'
    let body = { topicName }
    if (topicAction === 'delete') {
        verb = 'delete'
        body = { params: body }
    }
    console.log('body', body)
    return apiAction('/topics', body, verb)
}