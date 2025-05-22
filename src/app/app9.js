// URL 模块，生成一个 url 路径
const url = require('url')

const urlAddress = url.resolve('http://www.test.com', 'orderId')

console.log(urlAddress)
