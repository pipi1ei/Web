import { useState, useLayoutEffect } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  useLayoutEffect(() => {
    if(count === 0) {
      setCount(Math.random() * 200)
    }
  }, [count])

  return (
    <div>
      <h2>当前数字：{count}</h2>
      <button onClick={e => setCount(0)}>随机数</button>
    </div>
  )
}