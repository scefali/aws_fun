import Immutable from 'immutable'


import * as consts from './../consts'

const gensubscribeError = topicName => {
    if (!topicName) {
        return ''
    }
    return `Topic ${topicName} does not exist`
}


const initialState = Immutable.fromJS({
    subscribeError: ''
})


const subscribeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INVALID_SUBSCRIBE_TOPIC':
            const topicName = action.payload.topicName
            const subscribeError = gensubscribeError(topicName)
            return state.merge({ subscribeError });
        case 'CLEAR_SUBSCRIBE_ERROR':
            return state.set('subscribeError', '')
    }
    return state;
}

export default subscribeReducer