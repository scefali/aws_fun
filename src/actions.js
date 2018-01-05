import { createAction } from 'redux-actions'

import * as consts from './consts'





export const invalidSubscribeTopic = createAction('INVALID_SUBSCRIBE_TOPIC')
export const clearSubscribeError = createAction('CLEAR_SUBSCRIBE_ERROR')
export const setTopicSuccess = createAction('SET_TOPIC_SUCCESS')
export const setSubscribeSuccess = createAction('SET_SUBSCRIBE_SUCCESS')
export const setMessageSucess = createAction('SET_MESSAGE_SUCCESS')
export const setTopicFailure = createAction('SET_TOPIC_FAILURE')
export const loadTopicList = createAction('LOAD_TOPIC_LIST')