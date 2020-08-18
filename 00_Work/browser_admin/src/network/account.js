import request from './request'

/* 获取账户信息 */
export function getAccountInfo({ pageNum = 1, pageSize = 10 } = {}) {
  return request({
    url: '/system/getUserList',
    method: 'post',
    data: {
      pageNum,
      pageSize
    }
  })
}

/* 初始密码 */
export function initPassword(userId = '') {
  return request({
    url: '/system/initUserPassword',
    method: 'post',
    data: {
      userId
    }
  })
}

/* 新增账户 */
export function newAccount({ userName = '', password = '', phone = '' } = {}) {
  return request({
    url: '/system/addUser',
    method: 'post',
    data: {
      userName,
      password,
      phone
    }
  })
}

/* 更新账户信息 */
export function updateAccount({ userName, password, phone, userId = '' } = {}) {
  return request({
    url: '/system/updateUser',
    method: 'post',
    data: {
      userName,
      password,
      phone,
      userId
    }
  })
}

/* 删除账户 */
export function deleteAccount(userId = '') {
  return request({
    url: '/system/deleteUser',
    method: 'post',
    data: {
      userId
    }
  })
}

/* 判断用户账户是否唯一 */
export function checkUserName(userName = '') {
  log('suerName = ', userName)
  return new Promise((resolve, reject) => {
    request({
      url: '/system/getUserByName',
      method: 'post',
      data: {
        userName
      }
    }).then(res => {
      log('checkUserName: res = ', res)
      if (res.data) {
        resolve(false)
      } else {
        resolve(true)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

/* 判断用户手机号是否唯一 */
export function checkPhoneNumber(phone = '') {
  return new Promise((resolve, reject) => {
    request({
      url: '/system/getUserByPhone',
      method: 'post',
      data: {
        phone
      }
    }).then(res => {
      log('checkPhoneNumber: res = ', res)
      if (res.data) {
        resolve(false)
      } else {
        resolve(true)
      }
    }).catch(err => {
      reject(err)
    })
  })
}