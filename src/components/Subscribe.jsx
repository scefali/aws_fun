import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form/immutable'

import { Button, ButtonGroup } from 'react-bootstrap/lib'

import RenderField from './RenderField'
import RadioButton from './RadioButton'
import * as thunks from './../thunks'
import * as util from './../util'

const RenderError = (props) => <div />

var Subscribe = (props) => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name="action" field="subscribe" component={RadioButton} />
        <Field name="action" field="unsubscribe" component={RadioButton} />
      </div>
      <Field name="email" component={RenderField} type="text" label="email" />
      <Field name="topicName" component={RenderField} type="text" label="topic" />
      <Button bsStyle="success">{props.buttonText}</Button>
    </form>
    <ButtonGroup>
      <Button bsStyle="info" onClick={props.goToPage('message')}>
        Go To Send Message
      </Button>
      <Button bsStyle="info" onClick={props.goToPage('topic')}>
        Go To Create Topic
      </Button>
    </ButtonGroup>
    {props.subscribeError}
    <RenderError />
  </div>
)

const initialValues = {
  action: 'subscribe'
}

const mapStateToProps = (state, ownProps) => {
  const buttonText = util.subscribeSelector(state, 'action')
  const subscribeError = state.getIn([ 'subscribe', 'subscribeError' ])
  return {
    buttonText,
    initialValues,
    subscribeError
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: () => {
    dispatch(thunks.subscribe())
  },
  goToPage: (page) => {
    return () => dispatch(thunks.changePage(page))
  }
})

Subscribe = reduxForm({ form: 'subscribe' })(Subscribe)

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe)
