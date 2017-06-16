import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues} from 'redux-form/immutable'

import RenderField from './RenderField'
import RadioButton from './RadioButton'
import * as thunks from './../thunks'
import * as util from './../util'

const  { DOM: { input, select, textarea } } = React



var Topic = (props) => (
    <div>
        <h2>Create or Delete an AWS Topic</h2>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='topicAction'   field='create' component={RadioButton} />
                <Field name='topicAction'   field='delete' component={RadioButton} />
            </div>
            <Field name='topicName' component={RenderField} type='text' label='Name' />
            <button type='submit'>{props.buttonText}</button>
        </form>
        <button type='button' onClick={props.goToSubscribe}>Go To Subscribe</button>
    </div>
)


const initialValues = {
    topicAction: 'create'
}

const mapStateToProps = (state, ownProps) => {
    const buttonText = util.topicSelector(state, 'topicAction')
    return {
        buttonText,
        initialValues
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSubmit: () => {
        dispatch(thunks.topic());
  	},
    goToSubscribe: () => {
        dispatch(thunks.changePage('subscribe'))
    }
})


Topic = reduxForm({form: 'topic'})(Topic)

export default connect(mapStateToProps, mapDispatchToProps)(Topic)