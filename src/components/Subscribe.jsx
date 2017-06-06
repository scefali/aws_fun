import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues} from 'redux-form/immutable'

import RenderField from './RenderField'
import RadioButton from './RadioButton'
import * as thunks from './../thunks'

const  { DOM: { input, select, textarea } } = React

var Subscribe = (props) => (
    <div>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='action'   field='subscribe' component={RadioButton} />
                <Field name='action' field='unsubscribe' component={RadioButton} />
            </div>
            <Field name='email' component={RenderField} type='text' label='email' />
            <button type='submit'>{props.buttonText}</button>
        </form>
        <button type='button' onClick={props.nextPage}>Next</button>
    </div>
)


const initialValues = {
    action: 'subscribe'
}

const mapStateToProps = (state, ownProps) => {
    return {
        buttonText: 'Subscribe',
        initialValues
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSubmit: () => {
        dispatch(thunks.subscribe());
  	},
    nextPage: () => {
        dispatch(thunks.changePage('message'))
    }
})


Subscribe = reduxForm({form: 'subscribe'})(Subscribe)

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe)
