import { PureComponent } from 'react';
import { Route, withRouter } from 'react-router-dom';

import Home from '../components/Home';
import Profile from '../components/Profile';

class App extends PureComponent {
  render() {
    console.log(this.props.history)

    return (
      <div>
        <button onClick={e => this.jump('/')}>手动跳转到首页</button>
        <button onClick={e => this.jump('/profile')}>手动跳转到我的</button>

        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
      </div>
    )
  }

  jump(path) {
    this.props.history.push(path)
  }
}

export default withRouter(App)