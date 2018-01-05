import axios from 'axios'

import * as util from './util'


const local = window.location.hostname === 'localhost'

const remoteUrl = 'https://84ymx11lba.execute-api.us-west-1.amazonaws.com/latest'
const localUrl = 'http://localhost:2000'
const baseUrl = local ? localUrl : remoteUrl



const apiAction = (route, data, verb) => {
    const endpoint = baseUrl + route
    return axios[verb](endpoint, data)
}


export const sendMessage = state => {
    const { message, subject, topicName } = util.messageSelector(state, 'message', 'subject', 'topicName')
    return apiAction('/messages', { message, subject, topicName }, 'post')
}

export const subscribe = state => {
    const { action, email, topicName } = util.subscribeSelector(state, 'action', 'email', 'topicName')

    let verb = 'post'
    let body = { topicName, email }
    if (action === 'delete') {
        verb = 'delete'
        body = { params: body }
    }
    return apiAction('/subscriptions', body, verb)
}


export const topic = state => {
    const { action, topicName } = util.topicSelector(state, 'action', 'topicName')

    let verb = 'post'
    let body = { topicName }
    if (action === 'delete') {
        verb = 'delete'
        body = { params: body }
    }

    return apiAction('/topics', body, verb)
}


export const getTopics = () => {
    let verb = 'get'
    let body = {}
    return apiAction('/topics', body, verb)
}