import React, { Component } from 'react'

const UserContext = React.createContext({nickname: '默认', level: 1})
const ThemeContext = React.createContext({color: 'black'})


function ProfileHeader() {
  return (
    <div>
      <UserContext.Consumer>
        {
          value => {
            return (
              <ThemeContext.Consumer>
                {
                  theme => (
                    <div>
                      <h2 style={theme}>用户昵称：{value.nickname}</h2>
                      <h2 style={theme}>用户等级：{value.level}</h2>
                    </div>
                  )
                }
              </ThemeContext.Consumer>
            )
          }
        }
      </UserContext.Consumer>
    </div>
  )
}

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

export default function App() {
  return (
    // <UserContext.ProfileHeader value={{nickname: 'pipi2ei', level: 100}}>
    //   <ThemeContext.Provider value={{color: 'red'}}>
    //   <Profile />
    //   </ThemeContext.Provider>
    // </UserContext.ProfileHeader>

    <Profile />
  )
}
