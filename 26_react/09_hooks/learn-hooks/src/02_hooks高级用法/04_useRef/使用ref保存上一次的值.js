import {useState, useEffect, useRef} from 'react';

let prev = 0;

export default function App() {
  const [count, setCount] = useState(0)
  const countRef = useRef(count)

  useEffect(() => {
    countRef.current = count
  }, [count])

  return (
    <div>
      <h2>上一次的值：{countRef.current}</h2>
      <h2>这一次的值：{count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
    </div>
  )
}