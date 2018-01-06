import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form/immutable'

import { Button, ButtonGroup } from 'react-bootstrap/lib'

import RenderField from './RenderField'
import TextArea from './TextArea'
import * as thunks from './../thunks'

class MessageClass extends React.Component {
  componentDidMount() {
    this.props.getTopics()
  }

  render() {
    const props = this.props
    return (
      <div>
        <form>
          <h2>Send messages to an AWS Topic</h2>
          <div className="description">
            Choose an existing topic then type in a subject and message. Press submit to send the message.
          </div>
          <h3 />
          <div>
            <h3 className="successMessage">{props.message}</h3>
          </div>
          <div>
            <h3 className="errorMessage">{props.messageError}</h3>
          </div>
          <Field name="topicName" className="" component="select">
            {props.topics.map((topicName) => (
              <option value={topicName} key={topicName}>
                {topicName}
              </option>
            ))}
          </Field>
          <Field name="subject" component={RenderField} type="text" label="subject" />
          <div>
            <Field name="message" component={TextArea} type="text" label="message" />
          </div>
          <Button bsStyle="success" onClick={props.handleSubmit}>
            Submit
          </Button>
        </form>
        <ButtonGroup>
          <Button bsStyle="info" onClick={props.goToPage('topic')}>
            Go To Topic
          </Button>
          <Button bsStyle="info" onClick={props.goToPage('subscribe')}>
            Go To Subscribe
          </Button>
        </ButtonGroup>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const topics = state.getIn([ 'topic', 'topics' ])
  let { success, error: messageError } = state.getIn([ 'message' ]).toJS()
  let message = ''
  if (success) message = 'Message successfully sent'
  return { topics, message, messageError }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: () => {
    dispatch(thunks.sendMessage())
  },
  goToPage: (page) => {
    return () => dispatch(thunks.changePage(page))
  },
  getTopics: () => {
    dispatch(thunks.getTopics())
  }
})

const Message = reduxForm({ form: 'message' })(MessageClass)

export default connect(mapStateToProps, mapDispatchToProps)(Message)
