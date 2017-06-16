import { formValueSelector, getFormValues } from 'redux-form/immutable'

export const topicSelector = formValueSelector('topic')
export const messageSelector = formValueSelector('message')
export const subscribeSelector = formValueSelector('subscribe')