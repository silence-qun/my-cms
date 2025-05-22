const axios = require('axios')
const projectConfig = require('../util/projectConfigResolver')

const hostBaseUrl = projectConfig.hostBaseUrl

exports.doHttpGetRequest = function (ctx, requestUrl, params) {
  return this.doHttpRequest(ctx, requestUrl, params, 'GET')
}

exports.doHttpPutRequest = function (ctx, requestUrl, params) {
  return this.doHttpRequest(ctx, requestUrl, params, 'PUT')
}

exports.doHttpPostRequest = function (ctx, requestUrl, params) {
  return this.doHttpRequest(ctx, requestUrl, params, 'POST')
}

exports.doHttpDeleteRequest = function (ctx, requestUrl, params) {
  return this.doHttpRequest(ctx, requestUrl, params, 'DELETE')
}

exports.doHttpRequest = function (ctx, requestUrl, params, method) {
  if (method === 'GET') {
    return axios({
      baseURL: hostBaseUrl,
      url: requestUrl,
      method: 'GET',
      params,
    })
  } else if (['PUT', 'POST', 'DELETE'].includes(method)) {
    return axios({
      baseURL: hostBaseUrl,
      url: requestUrl,
      method,
      data: params,
    })
  }
}
