import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues} from 'redux-form/immutable';

import RenderField from './RenderField';
import * as thunks from './../thunks'

var App = (props) => (
    <form onSubmit={props.handleSubmit}>
        <Field name='email' component={RenderField} type='email' label='email' />
        <Field name='message' component={RenderField} type='text' label='message' />
        <button type='submit'>Send</button>
    </form>
)



const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSubmit: () => {
        dispatch(thunks.sendEmail());
  	}
})


App = reduxForm({form: 'app'})(App)

export default connect(mapStateToProps, mapDispatchToProps)(App)
