import React, { PureComponent } from 'react';
import Home from './Home';
import Profile from './Profile';

class App extends PureComponent {
  render() {
    return (
      <div>
        {/* <Home counter={this.state.counter} add={num => this.add(num)} />
        <Profile counter={this.state.counter} sub={num => this.sub(num)} /> */}
        <Home />
        <Profile />
      </div>
    )
  }

  // add(num) {
  //   this.setState({
  //     counter: this.state.counter + num
  //   })
  // }

  // sub(num) {
  //   this.setState({
  //     counter: this.state.counter - num
  //   })
  // }
}

export default App;
