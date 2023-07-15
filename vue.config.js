const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: true, // 启用本选项 babel-loader 会避免构建后的代码中出现未转译的第三方依赖。默认为 false，忽略所有的 node_modules 中的文件 
  // webpack-dev-server 相关配置
  devServer: {
    host: '0.0.0.0',
    port: '80',
    // 自动打开浏览器
    open: true,
    // proxy: {
    //   // detail: https://cli.vuejs.org/config/#devserver-proxy
    //   ['/api']: {
    //     target: '',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^/api']: '',
    //     },
    //   },
    // },
    // disableHostCheck: true,
    // https: true,
  },
})
