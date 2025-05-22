// path 模块，获取文件路径
const path = require('path')

// __dirname: 获取完整的绝对路径
// ..：拼接到上一层目录
const outputPath = path.join(__dirname, 'myDir', 'hello.js', '..')

console.log(outputPath)
