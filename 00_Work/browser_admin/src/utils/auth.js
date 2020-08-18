import Cookies from 'js-cookie'

const TokenKey = 'token'
const userIdKey = 'userId'
const passwordKey = 'password'

// token  ... 未用到
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


//  userId
export function getUserId() {
  return Cookies.get(userIdKey)
}

export function setUserId(userId) {
  return Cookies.set(userIdKey, userId)
}

export function removeUserId() {
  return Cookies.remove(userIdKey)
}


// password
export function getPassword() {
  return Cookies.get(passwordKey)
}

export function setPassword(password) {
  return Cookies.set(passwordKey, password)
}

export function removePassword() {
  return Cookies.remove(passwordKey)
}