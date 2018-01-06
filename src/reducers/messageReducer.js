import Immutable from 'immutable'





const initialState = Immutable.fromJS({
    error: '',
    success: false
})


const messageReducer = (state = initialState, action) => {
    let error, success
    switch (action.type) {
        case 'SET_MESSAGE_ERROR':
            error = action.payload
            success = false
            return state.merge({ error, success })
        case 'SET_MESSAGE_SUCCESS':
            success = true
            error = action.payload
            return state.merge({ error, success })
        case 'RESET_MESSAGE_FORM':
            error = ''
            success = false
            return state.merge({ error, success })

    }
    return state;
}

export default messageReducer