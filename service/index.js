
import { TOKEN_KEY } from '../constants/token-const'

const token = wx.getStorageSync(TOKEN_KEY)

const BASE_URL = 'http://localhost:3000/'
const LOGIN_BASE_URL = 'http://localhost:3030/'

class SRequest {
  constructor(baseURL, authHeader = {}) {
    this.baseURL = baseURL
    this.authHeader = authHeader
  }

  request(url, method, data, isAuth = false, header = {}) {
    const finalHeader = isAuth ? { ...this.authHeader, ...heder } : header
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseURL + url,
        header: finalHeader,
        data,
        method,
        success: (res) => {
          resolve(res.data)
        },
        fail: reject,
      })
    })
  }

  get(url, params, isAuth = false, header) {
    return this.request(url, 'GET', params, isAuth, header)
  }

  post(url, data, isAuth = false, header) {
    return this.request(url, 'POST', data, isAuth, header)
  }
}

const sRequst = new SRequest(BASE_URL)

const sLoginRequest = new SRequest(LOGIN_BASE_URL, { token })

export default sRequst
export { sLoginRequest }
