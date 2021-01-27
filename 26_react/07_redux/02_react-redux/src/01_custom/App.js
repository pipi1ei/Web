import React, { PureComponent } from 'react';
import Home from './Home';
import Profile from './Profile';

class App extends PureComponent {
  render() {
    return (
      <div>
        <Home />
        <Profile />
      </div>
    )
  }
}

export default App;
