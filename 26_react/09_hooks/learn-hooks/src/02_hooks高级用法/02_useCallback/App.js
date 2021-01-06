import React, { PureComponent } from 'react'
import Home from './components/Home'
// import Home from './components/useCallback结合memo'

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Home/>
      </div>
    )
  }
}
