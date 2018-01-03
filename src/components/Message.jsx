import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form/immutable'

import { Button, ButtonGroup } from 'react-bootstrap/lib'

import RenderField from './RenderField'
import * as thunks from './../thunks'

var Message = (props) => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <Field name="topicName" component={RenderField} type="text" label="topic name" />
      <Field name="subject" component={RenderField} type="text" label="subject" />
      <Field name="message" component={RenderField} type="text" label="message" />
      <Button bsStyle="success">Submit</Button>
    </form>
    <ButtonGroup>
      <Button bsStyle="info" onClick={props.goToPage('topic')}>
        Go To Topic
      </Button>
      <Button bsStyle="info" onClick={props.goToPage('subscribe')}>
        Go To Subscribe
      </Button>
    </ButtonGroup>
    {props.messageError}
  </div>
)

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: () => {
    dispatch(thunks.sendMessage())
  },
  goToPage: (page) => {
    return () => dispatch(thunks.changePage(page))
  }
})

Message = reduxForm({ form: 'message' })(Message)

export default connect(mapStateToProps, mapDispatchToProps)(Message)
