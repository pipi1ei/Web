import React, { useState } from 'react'

// export default function Counter() {
//   console.log(useState(1))
//   const [count, setCount] = useState(1)
//   return (
//     <div>
//       <h2>当前计数: {count}</h2>
//       <button onClick={e => setCount(count + 1)}>+1</button>
//       <button onClick={e => setCount(count - 1)}>-1</button>
//     </div>
//   )
// }

export default function App() {
  const [age, setAge] = useState(18);
  const [names, setNames] = useState(['zhangsan', 'lisi']);
  const [info, setInfo] = useState({name: 'why', height: 1.98});

  function addFriend() {
    names.push('wangwu');
    console.log('addFriend', names);
    setNames(names);
  }

  return (
    <div>
      <h2>当前年龄: {age}</h2>
      <button onClick={e => setAge(age + 1)}>增加年龄</button>

      <h2>朋友列表</h2>
      <ul>
        {
          names.map((name, index) => {
          return <li key={index}>{name}</li>
          })
        }
      </ul>
      <button onClick={e => setNames([...names, 'coderwhy'])}>添加好友</button>

      {/* 思考: 这样的方式是否可以实现 */}
      <button onClick={e => addFriend()}>添加好友</button>

      <h2>我的信息：</h2>
      <div>名字：{info.name}</div>
      <div>身高：{info.height}</div>
      <button onClick={e => setInfo({...info, name: 'pipilei'})}>修改名字</button>
    </div>
  )
}