import React, { PureComponent } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './style/TransitionGroupApp.css'

export default class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      friends: []
    }
  }

  render() {
    return (
      <div style={{width: 300, marginTop: 50, marginLeft: "auto", marginRight: "auto"}}>
        <TransitionGroup>
          {
            this.state.friends.map((item, index) => {
              return (
                <CSSTransition classNames="friend" timeout={300} key={index}>
                  <div>{item}</div>
                </CSSTransition>
              )
            })
          }
        </TransitionGroup>
        <button onClick={e => this.addFriend()}>+friend</button>
      </div>
    )
  }

  addFriend() {
    this.setState({
      friends: [...this.state.friends, "coderwhy"]
    })
  }
}