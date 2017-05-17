import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues} from 'redux-form/immutable';

import RenderField from './RenderField';

var App = (props) => (
    <form onSubmit={props.handleSubmit}>
        <Field name='email' component={RenderField} type='email' label='email' />
        <Field name='text' component={RenderField} type='text' label='text' />
    </form>
)



const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSubmit: () => {
  	}
})


App = reduxForm({form: 'app'})(App)

export default connect(mapStateToProps, mapDispatchToProps)(App)
