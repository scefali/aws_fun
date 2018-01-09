import Immutable from 'immutable'
import { routerMiddleware, push } from 'react-router-redux'

import { change } from 'redux-form'
import * as _ from 'lodash'

import * as api from './api'
import * as actions from './actions'
import * as util from './util'


export const sendMessage = () => {
    return (dispatch, getState) => {
        dispatch(actions.resetMessageForm())
        const state = getState()
        const topicName = util.messageSelector(state, 'topicName')
        api.sendMessage(state).then(response => {
            dispatch(actions.setMessageSucess())
        }).catch(err => {
            dispatch(actions.setMessageError('Error in sending a message'))
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
        const action = util.subscribeSelector(state, 'action')
        api.subscribe(state).then(response => {
            console.log('reponse', response.data)
            dispatch(actions.setSubscribeSuccess(response.data))
        }).catch(err => {
            console.log('err', err)
            const { code } = err
            let message = `Could not ${action} to topic ${topicName}`
            if (code === 'Topic does not exist') {
                message = `Topic ${topicName} does not exist`
            }
            dispatch(actions.setSubscribeError(message))
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
        dispatch(actions.resetTopicForm())
        const state = getState()
        api.getTopics(state).then(response => {
            const topics = _.map(response.data.Topics, (topicObj) => {
                    const topicArn = topicObj.TopicArn
                    const splitName = topicArn.split(':')
                    const topic = splitName[splitName.length - 1]
                    return topic
                })
                //no topics, maybe do something to notify user
            if (!topics) return
            dispatch(actions.loadTopicList(topics))
            const firstTopic = topics[0]
            dispatch(change('subscribe', 'topicName', firstTopic))
            dispatch(change('message', 'topicName', firstTopic))
        }).catch(error => {

        })
    }
}