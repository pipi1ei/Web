import { useCallback, memo, useState} from 'react'

const CounterIncrement = memo((props) => {
  console.log("CounterIncrement被渲染：", props.name)
  return <button onClick={props.increment}>+1</button>
})

export default function CallbackHookDemo() {
  const [count, setCount] = useState(0)

  const increment1 = useCallback(() => {
    setCount(count + 1)
  }, [count])

  const increment2 = function() {
    setCount(count + 1)
  }

  return (
    <div>
      <h2>当前计数：{count}</h2>
      {/* <button onClick={increment1}>+1</button>
      <button onClick={increment2}>+1</button> */}

      <CounterIncrement name="increment1" increment={increment1} />
      <CounterIncrement name="increment2" increment={increment2} />
    </div>
  )
}