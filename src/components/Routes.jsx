import React from 'react'
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'

import Subscribe from './Subscribe'
import Message from './Message'
import Topic from './Topic'

class Routes extends React.Component {
  render() {
    const { location } = this.props
    console.log('location', location)
    return (
      <div className="mainContent">
        <h1>AWS Fun</h1>
        <Route exact path="/subscribe" component={Subscribe} location={location} />
        <Route exact path="/message" component={Message} location={location} />
        <Route exact path="/topic" component={Topic} location={location} />
        <Route exact path="/" render={() => <Redirect to="/subscribe" />} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  //not sure if this is the correct way to do this
  //the locationBeforeTransitions state field is not set when the app boots up
  //so instead we use the prop from the top level if its not there yet
  var location = state.getIn([ 'router', 'locationBeforeTransitions' ])
  location = location ? location.toJS() : ownProps.topLocation
  return { location }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
