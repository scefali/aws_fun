import { createAction } from 'redux-actions'

import * as consts from './consts'





export const invalidSubscribeTopic = createAction('INVALID_SUBSCRIBE_TOPIC')
export const clearSubscribeError = createAction('CLEAR_SUBSCRIBE_ERROR')
export const setFormSubmitSuccess = createAction('SET_FORM_SUBMIT_SUCCESS')