import Immutable from 'immutable'





const initialState = Immutable.fromJS({
    subscribeError: ''
})


const messageReducer = (state = initialState, action) => {
    // switch (action.type) {
    //     case 'SET_TOPIC_ERROR':
    //         const topicName = action.payload.topicName
    //         const subscribeError = gensubscribeError(topicName)
    //         return state.merge({ subscribeError });
    //     case 'CLEAR_SUBSCRIBE_ERROR':
    //         return state.set('subscribeError', '')
    // }
    return state;
}

export default messageReducer