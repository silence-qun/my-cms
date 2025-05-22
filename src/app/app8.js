// URL 模块，生成一个 url
const url = require('url')

const urlObj = {
  host: 'www.test.com',
  port: 80,
  protocol: 'http',
  search: '?orderId=123',
  query: 'orderId=123',
  path: '/',
}

const realAddress = url.format(urlObj)

console.log(realAddress)
