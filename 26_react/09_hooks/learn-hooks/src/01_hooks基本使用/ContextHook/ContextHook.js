import React, { useContext } from 'react'
import { UserContext, ThemeContext } from './App'

export default function ContextHook() {
  const user =  useContext(UserContext)
  const theme =  useContext(ThemeContext)
  console.log({user, theme})

  return (
    <div>
      ContextHook
    </div>
  )
}