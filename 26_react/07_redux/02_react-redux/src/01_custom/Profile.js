import React, { PureComponent } from 'react';
import store from './store';
import { subActions } from './store/actionCreators';
import connect from './connect'

class Profile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      counter: store.getState().counter
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        counter: store.getState().counter
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Profile</h1>
        <h2>当前计数：{this.state.counter}</h2>
        <button onClick={e => this.sub(1)}>-1</button>
        <button onClick={e => this.sub(5)}>-5</button>
      </div>
    )
  }

  sub(num) {
    store.dispatch(subActions(num))
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    subNumber: function(number) {
      dispatch(subActions(number))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)