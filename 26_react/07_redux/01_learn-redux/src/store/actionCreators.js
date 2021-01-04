import { ADD_NUMBER, SUB_NUMBER } from './constants.js';

const addActions = (count) => ({
  type: ADD_NUMBER,
  num: count
})

const subActions = (count) => ({
  type: SUB_NUMBER,
  num: count
})

export {
  addActions,
  subActions
}