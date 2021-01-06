import { useState, useEffect } from 'react'

function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollPosition
}

function Home() {
  const scrollPosition = useScrollPosition()

  return (
    <div>
      <h2>Home</h2>
      <div style={{padding: "1000px 0"}}>
        <h2 style={{position: "fixed", top: 0, right: 0}}>CustomScrollPositionHook: {scrollPosition}</h2>
      </div>
    </div>
  )
}

function Profile() {
  const scrollPosition = useScrollPosition()

  return (
    <div>
      <h2>Profile</h2>
    </div>
  )
}

export default function App() {

  return (
    <div>
      <Home/>
      {/* <Profile/> */}
    </div>
  )
}