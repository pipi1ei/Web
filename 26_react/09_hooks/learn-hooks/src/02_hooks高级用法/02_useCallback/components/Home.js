import { useState, useCallback } from 'react'

export default function Home() {
  const [count, setCount] = useState(1)

  const increment1 = useCallback(function increment(){
    console.log('increment1')
    setCount(count + 1)
  }, [count])

  const increment2 = function() {
    console.log('increment2')
    setCount(count + 1)
  }

  return (
    <div>
      <h2>当前计数: {count}</h2>
      <button onClick={increment1}>+1</button>
      <button onClick={increment2}>+1</button>
    </div>
  )

}