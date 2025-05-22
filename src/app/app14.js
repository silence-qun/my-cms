// path 模块，获取文件拓展名
const path = require('path')

const extInfo = path.extname(path.join(__dirname, 'myDir', 'hello.js'))

console.log(extInfo)
