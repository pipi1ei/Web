import { getAccountInfo, initPassword, newAccount, updateAccount, deleteAccount, checkUserName, checkPhoneNumber } from 'network/account'

const actions = {
  // 获取账户信息
  getAccountInfo(context, paging) {
    return new Promise((resolve, reject) => {
      getAccountInfo(paging).then(res => {
        log('getAccountInfo: res = ', res)
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 初始化密码
  initPassword(context, userId) {
    return new Promise((resolve, reject) => {
      initPassword(userId).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 新增账户
  newAccount(context, accountInfo) {
    return new Promise((resolve, reject) => {
      newAccount(accountInfo).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 编辑账户
  updateAccount(context, accountInfo) {
    return new Promise((resolve, reject) => {
      updateAccount(accountInfo).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 删除账户
  deleteAccount(context, userId) {
    return new Promise((resolve, reject) => {
      deleteAccount(userId).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 判断账号是否唯一
  checkUserName(context, userName) {
    return new Promise((resolve, reject) => {
      checkUserName(userName).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 判断手机号是否唯一
  checkPhoneNumber(context, phone) {
    return new Promise((resolve, reject) => {
      checkPhoneNumber(phone).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
}

export default {
  namespaced: true,
  actions
}