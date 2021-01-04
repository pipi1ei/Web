import store from './store/index.js'
import { addActions, subActions } from './store/actionCreators.js';

store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch(addActions(5))
// console.log(store.getState())

store.dispatch(subActions(3))
// console.log(store.getState())

// store.dispatch({
//   type: "ADD_NUMBER",
//   number: 5
// })
// console.log(store.getState())

