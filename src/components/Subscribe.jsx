import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form/immutable'

import { Button, ButtonGroup, ToggleButtonGroup } from 'react-bootstrap/lib'

import RenderField from './RenderField'
import RadioButton from './RadioButton'
import * as thunks from './../thunks'
import * as util from './../util'

class SubscribeClass extends React.Component {
  componentDidMount() {
    this.props.getTopics()
  }

  render() {
    const props = this.props
    return (
      <div>
        <form>
          <h2>Subscribe or Unsubscribe an AWS Topic</h2>
          <div className="description">
            Type in your email address to subscribe or unsubscribe to an existing topic. If the topic does not exist
            yet, press "Go to Create Topic"
          </div>
          <ToggleButtonGroup type="radio" name="action">
            <Field name="action" type="radio" value="subscribe" component={RadioButton} />
            <Field name="action" type="radio" value="unsubscribe" component={RadioButton} />
          </ToggleButtonGroup>
          <Field name="email" component={RenderField} type="text" label="email" />
          <div>
            <div>
              <label>topic</label>
            </div>
            <Field name="topicName" className="" component="select">
              {props.topics.map((topicName) => (
                <option value={topicName} key={topicName}>
                  {topicName}
                </option>
              ))}
            </Field>
          </div>
          <Button bsStyle="success" onClick={props.handleSubmit}>
            Submit
          </Button>
          <div>
            <h3 className="successMessage">{props.topicSuccessMessage}</h3>
          </div>
          <div>
            <h3 className="errorMessage">{props.subscribeError}</h3>
          </div>
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
  }
}

const initialValues = {
  action: 'subscribe'
}

const mapStateToProps = (state, ownProps) => {
  var buttonText = util.subscribeSelector(state, 'action')
  if (!buttonText) buttonText = initialValues.action
  const subscribeError = state.getIn([ 'subscribe', 'subscribeError' ])
  const topics = state.getIn([ 'topic', 'topics' ])
  return {
    buttonText,
    initialValues,
    subscribeError,
    topics
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: () => {
    dispatch(thunks.subscribe())
  },
  getTopics: () => {
    dispatch(thunks.getTopics())
  },
  goToPage: (page) => {
    return () => dispatch(thunks.changePage(page))
  }
})

const Subscribe = reduxForm({ form: 'subscribe' })(SubscribeClass)

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe)
