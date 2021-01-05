import React, { PureComponent } from 'react'
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../components/Home'
import Profile from '../components/Profile'
import About from '../components/AboutNest'
import NoMatch from '../components/NoMatch';

export default class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        {/* <About></About> */}

        <Link exact to="/">首页</Link>
        <Link to="/profile">我的</Link>
        <Link to="/about">关于</Link>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/about" component={About} />
          <Route exact path="/about/message" component={About} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    )
  }
}