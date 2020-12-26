import React, { PureComponent, createContext } from 'react'

const UserContext = createContext({
  nickname: '默认',
  level: -1
})

function WithUser(WrappedCpn) {
  return props => {
    return (
      <UserContext.Consumer>
        {
          value => {
            return <WrappedCpn {...props} {...value} />
          }
        }
      </UserContext.Consumer>
    )
  }
}

function Header(props) {
  const { nickname, level } = props;
  return <h2>Header 昵称：{nickname}, 等级： {level}</h2>
}

function Footer(props) {
  const { nickname, level } = props;
  return <h2>Footer 昵称：{nickname}, 等级： {level}</h2>
}

const UserHeader = WithUser(Header);
const UserFooter = WithUser(Footer);

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <UserContext.Provider value={{ nickname: 'pipilei', level: 99 }}>
          <UserHeader />  
          <UserFooter />
        </UserContext.Provider>
      </div>
    )
  }
}