import React, { PureComponent, useState, useEffect } from 'react'

// 类组件实现
// export default class App extends PureComponent {
//   constructor(props) {
//     super(props)

//     this.state = {
//       counter: 0
//     }
//   }

//   componentDidMount() {
//     document.title = `当前计数：${this.state.counter}`
//   }

//   componentDidUpdate() {
//     document.title = `当前计数：${this.state.counter}`
//   }

//   render() {
//     return (
//       <div>
//         <h2>当前计数：{this.state.counter}</h2>
//         <button onClick={e => this.changeCounter(1)}>+1</button>
//         <button onClick={e => this.changeCounter(-1)}>-1</button>
//       </div>
//     )
//   }

//   changeCounter(value) {
//     this.setState({
//       counter: this.state.counter + value
//     })
//   }
// }

// 类组件结合hooks实现
export function App() {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    document.title = `当前计数：${count}`;
  })

  useEffect(() => {
    console.log("只有count改变才会执行")
  }, [count])

  useEffect(() => {
    console.log("监听事件")

    return () => {
      console.log("取消监听")
    }
  }, [])

  return (
    <div>
      <h2>当前计数：{count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
      <button onClick={e => setCount(count - 1)}>-1</button>

      <div><button onClick={e => setShow(!show)}>改版show</button>：{show + ""}</div>
    </div>
  )
}

export default class BasicApp extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      showApp: true
    }
  }

  render() {
    return (
      <div>
        {this.state.showApp ?　<App /> : ''}
        <button onClick={e => this.setState({showApp: !this.state.showApp})}>toggle</button>
      </div>
    )
  }
}
