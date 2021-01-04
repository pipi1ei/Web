import React, { PureComponent } from 'react'
import { subActions } from './store/actionCreators'
import { connect } from 'react-redux'

class Profile extends PureComponent {
  render() {
    return (
      <div>
        <h1>Profile</h1>
        <h2>当前计数：{this.props.counter}</h2>
        <button onClick={e => this.props.addNumber(1)}>-1</button>
        <button onClick={e => this.props.addNumber(5)}>-5</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNumber(num) {
      dispatch(subActions(num))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)