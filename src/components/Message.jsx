import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues} from 'redux-form/immutable';

import RenderField from './RenderField';
import * as thunks from './../thunks'

var Message = (props) => (
    <div>
        <form onSubmit={props.handleSubmit}>
            <Field name='topicName' component={RenderField} type='text' label='topic name' />
            <Field name='subject' component={RenderField} type='text' label='subject' />
            <Field name='message' component={RenderField} type='text' label='message' />
            <button type='submit'>Send</button>
        </form>
        <div>
            <button type='button' onClick={props.goToPage('topic')}>Go To Topic</button>
        </div>
        <div>
            <button type='button' onClick={props.goToPage('subscribe')}>Go To Subscribe</button>
        </div>
        {props.messageError}
    </div>
)



const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSubmit: () => {
        dispatch(thunks.sendMessage());
  	},
    goToPage: page => {
        return () => dispatch(thunks.changePage(page))
    }
})


Message = reduxForm({form: 'message'})(Message)

export default connect(mapStateToProps, mapDispatchToProps)(Message)
