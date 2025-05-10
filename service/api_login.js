import { sLoginRequest } from './index'

export function getLoginCode() {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 1000,
      success: (res) => {
        resolve(res.code)
      },
      fail: reject
    })
  })
}

export function codeToToken(code) {
  return sLoginRequest.post('', { code })
}

export function checkToken() {
  // 检测 token 有没有过期
  // return sLoginRequest.post('', {}, true)
  return true
}

export function checkSession() {
  return new Promise((resolve) => {
    wx.checkSession({
      success: () => {
        resolve(true)
      },
      fail: () => {
        resolve(false)
      }
    })
  })
}

export function getUserInfo() {
  return new Promise((resolve, reject) => {
    // 该接口已被回收，无法获取昵称和头像，详细信息见下方链接
    // https://developers.weixin.qq.com/community/develop/doc/00022c683e8a80b29bed2142b56c01?highLine=%25E5%25A4%25B4%25E5%2583%258F%25E6%2598%25B5%25E7%25A7%25B0
    wx.getUserProfile({
      desc: '信息',
      success: resolve,
      fail: reject
    })
  })
}