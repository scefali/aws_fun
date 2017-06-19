import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues} from 'redux-form/immutable'

import RenderField from './RenderField'
import RadioButton from './RadioButton'
import * as thunks from './../thunks'
import * as util from './../util'

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
        <div>
            <button type='button' onClick={props.goToPage('message')}>Go To Send Message</button>
        </div>
        <div>
            <button type='button' onClick={props.goToPage('topic')}>Go To Create Topic</button>
        </div>
    </div>
)


const initialValues = {
    action: 'subscribe'
}

const mapStateToProps = (state, ownProps) => {
    const buttonText = util.subscribeSelector(state, 'action')
    return {
        buttonText,
        initialValues
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSubmit: () => {
        dispatch(thunks.subscribe());
  	},
    goToPage: page => {
        return () => dispatch(thunks.changePage(page))
    }
})


Subscribe = reduxForm({form: 'subscribe'})(Subscribe)

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe)
