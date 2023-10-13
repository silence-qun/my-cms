const { defineConfig } = require('@vue/cli-service')
const path = require('path')

const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true, // 启用本选项 babel-loader 会避免构建后的代码中出现未转译的第三方依赖。默认为 false，忽略所有的 node_modules 中的文件
  publicPath: process.env.NODE_ENV === 'production' ? '/' : './',
  // webpack-dev-server 相关配置
  devServer: {
    host: '0.0.0.0',
    port: '80',
    // 自动打开浏览器
    open: true
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
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        components: '@/components'
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // }
  // chainWebpack: (config) => {
  //   config.resolve.alias.set('@', path.resolve(__dirname, 'src')).set('components', '@/components')
  // }
})
