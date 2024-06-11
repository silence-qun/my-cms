const path = require('path')

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 's_utils.js',
    library: 'SUtils',

    // umd 指支持 AMD/CommonJS/CommonJS2/浏览器
    // CommonJS：社区规范的 CommonJS，这个里面没有 module 对象
    // CommonJS2：node 实现的 CommonJS，这个里面有 module 对象，module.exports
    libraryTarget: 'umd',

    // 当输出为 library 时，尤其是当 libraryTarget 为 'umd'时，此选项将决定使用哪个全局对象来挂载 library
    // 为了使 UMD 构建在浏览器和 Node.js 上均可用，应将 output.globalObject 选项设置为 'this'
    // 对于类似 web 的目标，默认为 self。
    // 入口点的返回值将会使用 output.library.name 赋值给全局对象
    globalObject: 'this',
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'dll_[name]',
      path: path.resolve(__dirname, './dll/[name].manifest.json'),
    }),
  ],
}
