import { combineEpics } from 'redux-observable'
import 'rxjs'

import * as actions from './actions'


const router = (action$) => {
    return action$.ofType('@@router/LOCATION_CHANGE').mergeMap(action => {
        return [actions.clearSubscribeError(), actions.resetMessageForm(), actions.resetTopicForm()]
    })
}



export default combineEpics(router)