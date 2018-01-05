import Immutable from 'immutable'
import { routerMiddleware, push } from 'react-router-redux'
import * as _ from 'lodash'

import * as api from './api'
import * as actions from './actions'
import * as util from './util'


export const sendMessage = () => {
    return (dispatch, getState) => {
        const state = getState()
        api.sendMessage(state).then(response => {
            console.log('sendMessage response: ', response.data)
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
        dispatch(actions.clearSubscribeError())
        const state = getState()
        const topicName = util.subscribeSelector(state, 'topicName')
        api.subscribe(state).then(response => {
            console.log('subscribe response: ', response.data)
        }).catch(err => {
            const message = err.response.data
            if (message === 'Topic does not exist') {
                dispatch(actions.invalidSubscribeTopic({ topicName }))
            }
        })
    }
}

export const topic = () => {
    return (dispatch, getState) => {
        const state = getState()
        const { action: actionType, topicName } = util.topicSelector(state, 'action', 'topicName')
        api.topic(state).then(response => {
            dispatch(actions.setTopicSuccess({ topicName, actionType }))
        }).catch(error => {
            dispatch(actions.setTopicFailure({ topicName, actionType }))
        })
    }
}


export const getTopics = () => {
    return (dispatch, getState) => {
        const state = getState()
        api.getTopics(state).then(response => {
            const topics = _.map(response.data.Topics, (topicObj) => {
                const topicArn = topicObj.TopicArn
                const splitName = topicArn.split(':')
                const topic = splitName[splitName.length - 1]
                return topic
            })
            dispatch(actions.loadTopicList(topics))
        }).catch(error => {

        })
    }
}