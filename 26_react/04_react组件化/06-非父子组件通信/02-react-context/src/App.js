import React, { Component } from 'react'

const userContext = React.createContext({nickname: '默认', level: 0})

class ProfileHeader extends Component {
  render() {
    return (
      <div>
        <h2>用户昵称：{this.context.nickname}</h2>
        <h2>用户等级：{this.context.level}</h2>
      </div>
    )
  }
}
ProfileHeader.contextType = userContext;

class Profile extends Component {
  render() {
    return (
      <div>
        <ProfileHeader />
        <ul>
          <li>设置1</li>  
          <li>设置2</li>  
          <li>设置3</li>  
          <li>设置4</li>  
          <li>设置5</li>  
        </ul>
      </div>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        <userContext.Provider value={{nickname: 'pipilei', level: 99}}>
          <Profile />
        </userContext.Provider>
        <h2>其他内容</h2>
      </div>
    )
  }
};
