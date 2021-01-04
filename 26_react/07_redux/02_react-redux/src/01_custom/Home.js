import React, { PureComponent } from 'react';
import store from './store'
import { addActions } from './store/actionCreators'
import connect from './connect';

class Home extends PureComponent {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     counter: store.getState().counter
  //   }
  // }

  // componentDidMount() {
  //   store.subscribe(() => {
  //     this.setState({
  //       counter: store.getState().counter
  //     })
  //   })
  // }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>当前计数：{this.props.counter}</h2>
        <button onClick={e => this.props.addNumber(1)}>+1</button>
        <button onClick={e => this.props.addNumber(5)}>+5</button>
      </div>
    )
  }

  // add(num) {
  //   console.log('add')
  //   store.dispatch(addActions(num))
  // }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNumber: function(number) {
      console.log('addNumber')
      dispatch(addActions(number))
    } 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);