import { forwardRef, useRef } from 'react'

const CInput = forwardRef((props, ref) => {
  return <input type="text" ref={ref} />
})

export default function App() {
  const inputRef = useRef();
  return (
    <div>
      <CInput ref={inputRef} />
      <button onClick={e => inputRef.current.focus()}>聚焦</button>
    </div>
  )
}