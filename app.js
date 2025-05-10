// app.js
import { getLoginCode, codeToToken, checkToken, checkSession } from './service/api_login'
import { TOKEN_KEY } from './constants/token-const'

App({
  onLaunch: function () {
    // 1. 获取设备信息
    const info = wx.getSystemInfoSync()
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
    this.globalData.statusBarHeight = info.statusBarHeight
    this.globalData.deviceRadio = info.screenHeight / info.screenWidth

    // 2. 让用户默认进行登录
    this.handleLogin()

    // 3. 获取用户的信息
    // 只能通过点击按钮，才能调用该方法
    // wx.getUserProfile({
    //   desc: 'desc',
    // })
  },
  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    statusBarHeight: 0,
    navBarHeight: 44,
    deviceRadio: 0,
  },
  loginAction: async function () {
    // 获取 code
    const code = await getLoginCode()

    // 获取 token
    // const result = await codeToToken(code)
    // wx.setStorageSync(TOKEN_KEY, result.token)
  },

  handleLogin: async function () {
    const token = wx.getStorageSync(TOKEN_KEY)
    const checkResult = checkToken()
    const isSessionExpire = await checkSession()
    if (!token || checkResult || !isSessionExpire) this.loginAction()
  }
})
