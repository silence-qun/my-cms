// URL 模块，解析一个 url
const url = require('url')

const urlStr = 'http://www.test.com?orderId=123'

const urlObj = url.parse(urlStr)

console.log(urlObj)
