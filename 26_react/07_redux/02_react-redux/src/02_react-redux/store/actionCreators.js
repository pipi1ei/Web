import { ADD_NUMBER, SUB_NUMBER } from './constants'

export const addActions = num => ({
  type: ADD_NUMBER,
  num: num
})

export const subActions = num => ({
  type: SUB_NUMBER,
  num: num
})