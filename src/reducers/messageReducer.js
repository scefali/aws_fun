import Immutable from 'immutable'



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
        case 'invalidTopic':
            const topicName = action.payload.topicName
            const subscribeError = gensubscribeError(topicName)
            return state.merge({ subscribeError });
        case 'clearSubscribeError':
            return state.set('subscribeError', '')
    }
    return state;
}

export default subscribeReducer