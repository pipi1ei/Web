import React, { PureComponent } from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';

import Home from '../components/Home';
import About from '../components/About';
import Profile from '../components/Profile';
import User from '../components/User';
import NoMatch from '../components/NoMatch';

export default class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
        <Link to="/profile">我的</Link>

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/profile" component={Profile} />
        <Route path="/:userid" component={User} />
        <Route component={NoMatch} />
      </BrowserRouter>
    )
  }
}

