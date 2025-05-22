// querystring 模块
const querystring = require('querystring')

const obj = {
  name: 'zhangsan',
  address: 'xiamen',
}

const result = querystring.stringify(obj)

console.log(result)
