// path 模块，解析文件路径
const path = require('path')

const filePath = '/Users/helloworld/test.js'

const obj = path.parse(filePath)

console.log(obj)
