import React, { PureComponent } from 'react'
import Home from './components/Home'
import Profile from './components/Profile'

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Home/>
        <Profile/>
      </div>
    )
  }
}

