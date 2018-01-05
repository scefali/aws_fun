import Immutable from 'immutable'






const initialState = Immutable.fromJS({
    subscribeError: '',
    subscribeSuccessMessage: ''
})


const subscribeReducer = (state = initialState, action) => {
    let subscribeError, subscribeSuccessMessage
    switch (action.type) {
        case 'SET_SUBSCRIBE_ERROR':
            subscribeError = action.payload
            subscribeSuccessMessage = ''
            return state.merge({ subscribeError, subscribeSuccessMessage })
        case 'CLEAR_SUBSCRIBE_ERROR':
            subscribeError = ''
            subscribeSuccessMessage = ''
            return state.merge({ subscribeError, subscribeSuccessMessage })
        case 'SET_SUBSCRIBE_SUCCESS':
            subscribeSuccessMessage = action.payload
            subscribeError = ''
            return state.merge({ subscribeSuccessMessage, subscribeError })

    }
    return state;
}

export default subscribeReducer