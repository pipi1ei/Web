import React, { PureComponent } from 'react';
import {BrowserRouter, NavLink, Route} from 'react-router-dom';

import Home from '../components/Home';
import About from '../components/About';
import Profile from '../components/Profile';

import './style/route.css';

export default class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <NavLink exact to="/" activeStyle={{color: "red"}}>首页</NavLink>
        <NavLink to="/about" activeClassName="active-route">关于</NavLink>
        <NavLink to="/profile">我的</NavLink>

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/profile" component={Profile} />
      </BrowserRouter>
    )
  }
}

