import { ADD_NUMBER, SUB_NUMBER } from './constants'

const initialState = {
  counter: 0
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_NUMBER: 
      return { ...state, counter: state.counter + action.num }
    case SUB_NUMBER: 
      return { ...state, counter: state.counter - action.num }
    default:
      return state
  }
}

export default reducer