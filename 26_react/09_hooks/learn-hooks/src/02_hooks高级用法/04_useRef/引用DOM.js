import { useRef } from 'react';

export default function App() {
  const inputRef = useRef()
  const titleRef = useRef()

  function handleOperate() {
    titleRef.current.innerHTML = "coderwhy"
    inputRef.current.focus()
  }

  return (
    <div>
      <input ref={inputRef} type="text" />
      <h2 ref={titleRef}>默认内容</h2>

      <button onClick={e => handleOperate()}>操作</button>
    </div>
  )
}