import request from './request'

// 登录
export function login({ userName = '', password = '' } = {}) {
  return request({
    url: '/system/login',
    method: 'post',
    data: {
      userName,
      password
    }
  })
}

// 获取用户信息
export function getInfo(userId = '') {
  return request({
    url: '/system/getUserById',
    method: 'post',
    data: { userId }
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 更新密码
export function updatePassword({ userId = '', password = '', newPassword = '' } = {}) {
  return request({
    url: '/system/updateUserPassword',
    method: 'post',
    data: {
      userId,
      password,
      newPassword
    }
  })
}