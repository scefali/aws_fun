import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form/immutable'

import { Button, ButtonGroup, ToggleButtonGroup } from 'react-bootstrap/lib'

import RenderField from './RenderField'
import RadioButton from './RadioButton'
import * as thunks from './../thunks'
import * as util from './../util'

var Subscribe = (props) => (
  <div>
    <form>
      <h2>Subscribe or Unsubscribe an AWS Topic</h2>
      <div className="description">
        Type in your email address to subscribe or unsubscribe to an existing topic. If the topic does not exist yet,
        press "Go to Create Topic"
      </div>
      <ToggleButtonGroup type="radio" name="action">
        <Field name="action" type="radio" value="subscribe" component={RadioButton} />
        <Field name="action" type="radio" value="unsubscribe" component={RadioButton} />
      </ToggleButtonGroup>
      <Field name="email" component={RenderField} type="text" label="email" />
      <Field name="topicName" component={RenderField} type="text" label="topic" />
      <Button bsStyle="success" onClick={props.handleSubmit}>
        Submit
      </Button>
      <div>{props.subscribeError}</div>
    </form>
    <ButtonGroup>
      <Button bsStyle="info" onClick={props.goToPage('message')}>
        Go To Send Message
      </Button>
      <Button bsStyle="info" onClick={props.goToPage('topic')}>
        Go To Create Topic
      </Button>
    </ButtonGroup>
  </div>
)

const initialValues = {
  action: 'subscribe'
}

const mapStateToProps = (state, ownProps) => {
  var buttonText = util.subscribeSelector(state, 'action')
  if (!buttonText) buttonText = initialValues.action
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
