// 根级别的 action
const actions = {
  aUpdateInfo(context, payload) {
    return new Promise(resolve => {
      setTimeout(() => {
        context.commit('updateInfo')
        console.log(payload)
        resolve('里面已经完成了');
      }, 1000);
    })
  }
}

export default actions