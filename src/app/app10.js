// querystring 模块
const querystring = require('querystring')

const str = 'name=zhangsan&address=xiamen'

const obj = querystring.parse(str)

console.log(obj)
