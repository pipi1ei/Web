import { useState, useEffect } from 'react'

function useLocalStorage(key) {
  const [data, setData] = useState(() => JSON.parse(window.localStorage.getItem(key)))

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(data))
  }, [data])

  return [data, setData]
}

function Home() {
  const [name, setName] = useLocalStorage('name')

  return (
    <div>
      <h2>Home</h2>
      <h2>name: {name}</h2>
      <button onClick={e => setName('codewhy')}>存储name</button>
    </div>
  )
}

export default function App() {

  return (
    <div>
      <Home/>
    </div>
  )
}