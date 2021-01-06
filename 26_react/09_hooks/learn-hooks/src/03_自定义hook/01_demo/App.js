import { useState, useEffect } from 'react'

function Home() {
  useEffect(() => {
    console.log("Home组件被创建了")
    return () => {
      console.log("Home组件被销毁了")
    }
  }, [])

  return <h2>Home</h2>
}

function Profile() {
  useEffect(() => {
    console.log("Profile组件被创建了")
    return () => {
      console.log("Profile组件被销毁了")
    }
  }, [])

  return <h2>Profile</h2>
}

export default function App() {
  const [showCpn, setShowCpn] = useState(true)

  return (
    <div>
      { showCpn && <Home/> }
      { showCpn && <Profile/> }
      <button onClick={e => setShowCpn(!showCpn)}>toggle</button>
    </div>
  )
}