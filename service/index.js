const BASE_URL = 'http://localhost:3000/'

class SRequest {
  request(url, method, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        data,
        method,
        success: (res) => {
          resolve(res.data)
        },
        fail: reject,
      })
    })
  }

  get(url, params) {
    return this.request(url, 'GET', params)
  }

  post(url, data) {
    return this.request(url, 'POST', data)
  }
}

const sRequst = new SRequest()

export default sRequst
