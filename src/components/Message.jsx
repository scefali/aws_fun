import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues} from 'redux-form/immutable';

import RenderField from './RenderField';
import * as thunks from './../thunks'

var Message = (props) => (
    <div>
        <form onSubmit={props.handleSubmit}>
            <Field name='subject' component={RenderField} type='text' label='subject' />
            <Field name='message' component={RenderField} type='text' label='message' />
            <button type='submit'>Send</button>
        </form>
        <button type='button' onClick={props.goToSubscribe}>Subscribe/Unsubscribe</button>
    </div>
)



const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSubmit: () => {
        dispatch(thunks.sendMessage());
  	},
    goToSubscribe: () => {
        dispatch(thunks.changePage('subscribe'))
    }
})


Message = reduxForm({form: 'message'})(Message)

export default connect(mapStateToProps, mapDispatchToProps)(Message)
