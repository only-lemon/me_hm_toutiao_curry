// 存储token 获取token

const KEY = 'USER_TOKEN'

export default {
  // 存储token用户个人信息,,,
  setUserToken (user) {
    const localUser = this.getUserToken()
    const newUser = { ...localUser, ...user }
    window.sessionStorage.setItem(KEY, JSON.stringify(newUser))
  },
  // 获取token用户个人信息,,,
  getUserToken () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  // 退出登录,,,清空token
  clearUserToken () {
    window.sessionStorage.removeItem(KEY)
  }
}
