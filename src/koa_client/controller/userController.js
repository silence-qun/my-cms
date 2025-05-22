const qs = require('qs')
const baseHttpClient = require('../common/baseHttpClient')
const userRequestUrlMappingResolver = require('../config/client/userRequestUrlMappingResolver')

// 响应数据格式
// {
//   result: { code: 0, description: 'success' },
//   data: {},
// }

class UserController {
  async login(ctx) {
    const requestUrl = userRequestUrlMappingResolver.login

    console.log(ctx.request.body)

    const response = await baseHttpClient.doHttpPostRequest(ctx, requestUrl, JSON.stringify(ctx.request.body))

    const responseData = qs.parse(response.data)
    const responseDataCode = responseData.result.code

    if (responseDataCode === 0) {
      ctx.body = responseData
    } else {
      ctx.body = responseData
    }
  }
}

module.exports = new UserController()
