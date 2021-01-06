import React, { PureComponent, createContext } from 'react'
import ContextHook from './ContextHook'

export const UserContext = createContext({name: 'coderwhy', age: 18})
export const ThemeContext = createContext({color: "red"})

export default class App extends PureComponent {
  render() {
    return (
      <UserContext.Provider value={{name: "pipi1ei", age: 20}}>
        <ThemeContext.Provider value={{color: "red"}}>
          <ContextHook />
        </ThemeContext.Provider>
      </UserContext.Provider>
    )
  }
}