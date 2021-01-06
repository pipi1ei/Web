import { useState, useMemo, memo } from 'react'

function calcTotal(num) {
  let total = 0;
  for(let i = 1; i < num; i++) {
    total += i
  }
  console.log("计算一次");
  return total
}

const ShowCounter = memo(props => {
  console.log("ShowCounter渲染");
  return <h1>Counter: {props.total}</h1>
})

const ShowInfo = memo(props => {
  console.log("ShowInfo重新渲染");
  return <h1>信息：{props.info.name}</h1>
})

export default function App() {
  const [count, setCount] = useState(10)
  const [isLogin, setLogin] = useState(true)

  const total = useMemo(() => {
    return calcTotal(count);
  }, [count]);

  const info = useMemo(() => {
    return {name: 'coderwhy'}
  }, [])

  return (
    <div>
      <h2>数字和：{total}</h2>
      <ShowCounter total={total} />
      <ShowInfo info={info} />
      <button onClick={e => setCount(count + 1)}>+1</button>
      { isLogin && <h2>coderwhy</h2> }
      <button onClick={e => setLogin(!isLogin)}>切换</button>
    </div>
  )
}
