import { useState, useMemo } from 'react'

function calcTotal(num) {
  let total = 0;
  for(let i = 1; i < num; i++) {
    total += i
  }
  console.log("计算一次")
  return total
}

// 未使用useMemo优化
// export default function App() {
//   const [count, setCount] = useState(10)
//   const [isLogin, setLogin] = useState(true)

//   const total = calcTotal(count)

//   return (
//     <div>
//       <h2>数字和：{total}</h2>
//       <button onClick={e => setCount(count + 1)}>+1</button>
//       { isLogin && <h2>coderwhy</h2>}
//       <button onClick={e => setLogin(!isLogin)}>切换</button>
//     </div>
//   )
// }

// 使用useMemo优化
export default function App() {
  const [count, setCount] = useState(10)
  const [isLogin, setLogin] = useState(true)

  const total = useMemo(() => {
    calcTotal(count)
  }, [count])

  return (
    <div>
      <h2>数字和：{total}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
      { isLogin && <h2>coderwhy</h2>}
      <button onClick={e => setLogin(!isLogin)}>切换</button>
    </div>
  )
}