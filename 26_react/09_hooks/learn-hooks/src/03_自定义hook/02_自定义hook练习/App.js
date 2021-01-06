import { useState, useEffect } from 'react'

function useLoggingLife(name) {
  useEffect(() => {
    console.log(`${name}组件被创建了`)
    return () => {
      console.log(`${name}Home组件被销毁了`)
    }
  }, [])
}

function Home() {
  useLoggingLife('Home')

  return <h2>Home</h2>
}

function Profile() {
  useLoggingLife('Profile')

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