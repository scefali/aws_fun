import Immutable from 'immutable'






const initialState = Immutable.fromJS({
    topicSuccessMessage: '',
    topicFailureMessage: '',
    topics: []
})


const topicReducer = (state = initialState, action) => {
    let actionType, topicName, topicFailureMessage, topicSuccessMessage, topics
    switch (action.type) {
        case 'SET_TOPIC_SUCCESS':
            topicName = action.payload.topicName
            actionType = action.payload.actionType
            topicSuccessMessage = `Topic ${topicName} successfully ${actionType}d!`
            topicFailureMessage = ''
            return state.merge({ topicSuccessMessage, topicFailureMessage })
        case 'SET_TOPIC_FAILURE':
            topicName = action.payload.topicName
            actionType = action.payload.actionType
            topicFailureMessage = `Topic ${topicName} failed to ${actionType}!`
            topicSuccessMessage = ''
            return state.merge({ topicSuccessMessage, topicFailureMessage })
        case 'LOAD_TOPIC_LIST':
            topics = action.payload
            return state.merge({ topics })

    }
    return state;
}

export default topicReducer