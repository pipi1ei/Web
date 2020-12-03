import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'hello react'
    }
  }

  render() {
  return <h2>{this.state.message}</h2>
  }
}

export default App