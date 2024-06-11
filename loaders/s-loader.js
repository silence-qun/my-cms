// 获取 loader 参数（高版本已不提供这个方法）
// 安装：npm i loader-utils@2.0.0 -D
const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils')

const schema = require('../schema/loader-schema.json')

// module.exports = function (context) {
//   // context 是 读取到的文件内容
//   // 可对内容进行自定义的操作

//   // 同步 loader，返回数据方式
//   // 方式一：
//   // return context
//   // 方式二
//   this.callback(null, context)
// }

// 异步 loader
module.exports = function (context) {
  const options = getOptions(this)
  console.log(options)

  validate(schema, options, { name: 's-loader' })

  const callback = this.async()

  setTimeout(() => {
    callback(null, context)
  }, 2000)
}

// 在执行时 loader 的 pitch 函数会按顺序从左到右执行
// 但 loader 是从右到左执行
module.exports.pitch = function () {
  // ...
}
