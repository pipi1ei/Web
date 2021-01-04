const state = {
  counter: 1,
  name: 'pipi1ei'
}

const reducer = (state, action) => {
  return { ...state, counter: action.counter}
}

console.log(reducer(state, { counter: 99 }))