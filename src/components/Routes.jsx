import React from 'react'
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'

import Subscribe from './Subscribe'
import Message from './Message'
import Topic from './Topic'

class Routes extends React.Component {
  render() {
    return (
      <div className="mainContent">
        <h1>AWS Fun</h1>
        <Route exact path="/subscribe" component={Subscribe} />
        <Route exact path="/message" component={Message} />
        <Route exact path="/topic" component={Topic} />
        <Route exact path="/*" render={() => <Redirect to="/subscribe" />} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
