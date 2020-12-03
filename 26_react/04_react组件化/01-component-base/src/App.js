import React, { Component } from 'react'

class MyComponent extends Component {
  constructor(props) {
    super(props)
    console.log('MyComponent constructor')
  }

  render() {
    console.log('MyComponent render')
    return <h2>MyComponent</h2>
  }

  componentDidMount() {
    console.log('MyComponent componentDidMount')
  }

  componentDidUpdate() {
    console.log('MyComponent componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('MyComponent componentWillUnmount')
  }
}



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
    console.log('App constructor')
  }

  render() {
    console.log('App render')
    return (
      <div>
        <h2>当前计数： {this.state.count}</h2>
        {this.state.count <= 5 && <MyComponent/>}
        <button onClick={e => this.btnClick()}>+1</button>
      </div>
    )
  } 

  btnClick() {
    this.setState({
      count: this.state.count + 1
    })
  }

  componentDidMount() {
    console.log('App componentDidMount')
  }

  componentDidUpdate() {
    console.log('App componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('App componentWillUnmount')
  }
}

export default App;
