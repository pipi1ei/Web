import { useRef, forwardRef, useImperativeHandle } from 'react';

const CInput = forwardRef((props, ref) => {
  const inputRef = useRef()

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus()
      },
      printHello() {
        console.log("hello")
      }
    }
  })

  return <input type="text" ref={inputRef} />
})

export default function App() {
  const inputRef = useRef()

  return (
    <div>
      <CInput ref={inputRef} />
      <button onClick={e => inputRef.current.focus()}>聚焦</button>
      <button onClick={e => inputRef.current.printHello()}>printHello</button>
    </div>
  )
}