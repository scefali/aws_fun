import { createAction } from 'redux-actions'

import * as consts from './consts'





export const invalidSubscribeTopic = createAction(consts.INVALID_SUBSCRIBE_TOPIC)
export const clearSubscribeError = createAction('clearSubscribeError')