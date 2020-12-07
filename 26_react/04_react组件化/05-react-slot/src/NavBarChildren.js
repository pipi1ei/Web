import React, { Component} from 'react';

// children 实现
export default class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <div className="item left">{this.props.children[0]}</div>
        <div className="item center">{this.props.children[1]}</div>
        <div className="item right">{this.props.children[2]}</div>
      </div>
    )
  }
}