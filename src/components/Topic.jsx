import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form/immutable'

import { Button, ButtonGroup, ToggleButtonGroup } from 'react-bootstrap/lib'

import RenderField from './RenderField'
import RadioButton from './RadioButton'
import * as thunks from './../thunks'
import * as util from './../util'

var Topic = (props) => (
  <div>
    <h2>Create or Delete an AWS Topic</h2>
    <div>Please type the name of the AWS topic you want to create or delete</div>
    <form>
      <ToggleButtonGroup type="radio" name="action">
        <Field name="action" type="radio" value="create" component={RadioButton} />
        <Field name="action" type="radio" value="delete" component={RadioButton} />
      </ToggleButtonGroup>
      <div>
        <h3 className="successMessage">{props.topicSuccessMessage}</h3>
      </div>
      <div>
        <h3 className="errorMessage">{props.topicFailureMessage}</h3>
      </div>
      <Field name="topicName" component={RenderField} type="text" label="Name" />
      <Button onClick={props.handleSubmit} bsStyle="success">
        Submit
      </Button>
    </form>
    <ButtonGroup>
      <Button bsStyle="info" onClick={props.goToPage('message')}>
        Go To Send Message
      </Button>
      <Button bsStyle="info" onClick={props.goToPage('subscribe')}>
        Go To Subscribe
      </Button>
    </ButtonGroup>
  </div>
)

const initialValues = {
  action: 'create'
}

const mapStateToProps = (state, ownProps) => {
  const buttonText = util.topicSelector(state, 'action')
  const { topicSuccessMessage, topicFailureMessage } = state.getIn([ 'topic' ]).toJS()
  return {
    buttonText,
    initialValues,
    topicSuccessMessage,
    topicFailureMessage
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: () => {
    dispatch(thunks.topic())
  },
  goToPage: (page) => {
    return () => dispatch(thunks.changePage(page))
  }
})

Topic = reduxForm({ form: 'topic' })(Topic)

export default connect(mapStateToProps, mapDispatchToProps)(Topic)
