import axios from 'axios'

import * as util from './util'


const local = 1

const remoteUrl = 'https://84ymx11lba.execute-api.us-west-1.amazonaws.com/latest'
const localUrl = 'http://localhost:2000'
const baseUrl = local ? localUrl : remoteUrl

const postAction = (route, data) => {
    const endpoint = baseUrl + route
    console.log('postAction', endpoint, data)
    return axios.post(endpoint, data)
}

export const sendMessage = state => {
    const { message, subject } = util.messageSelector(state, 'message', 'subject')
    return postAction('/sendMessage', { message, subject })
}

export const subscribe = state => {
    const { action, email } = util.subscribeSelector(state, 'action', 'email')
    const endpoint = `/${action}Email`
    return postAction(endpoint, { email })
}

export const topic = state => {
    const { topicAction, topicName } = util.topicSelector(state, 'topicAction', 'topicName')
    const endpoint = `/${topicAction}Topic`
    return postAction(endpoint, { topicName })
}