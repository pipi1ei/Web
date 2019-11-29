// 根级别的 getters
const getters = {
  powCounter(state) {
    return state.counter * state.counter
  },
  ageHeigh20(state) {
    return state.students.filter(value => value.age > 20)
  },
  ageHeigh20Counts(state, getters) {
    return getters.ageHeigh20.length
  },
  ageHigh(state) {
    return function (age) {
      return state.students.filter(value => value.age > age)
    }
  }
}

export default getters