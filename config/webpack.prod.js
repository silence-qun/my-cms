const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 默认已安装
const glob = require('glob')
const resolveApp = require('./paths')

module.exports = function (env) {
  return {
    mode: 'production',
    plugins: [
      new CleanWebpackPlugin(),
      new PurgeCSSPlugin({
        // 匹配 src 下所有文件（nodir 为 true 表示不匹配文件夹）
        paths: glob.sync(`${resolveApp('./src')}/**/*`, { nodir: true }),
        safelist: function () {
          return {
            standard: ['body', 'html'],
          }
        },
      }),
      new CompressionPlugin({
        threshold: 0,
        test: /\.(js|css)$/i,
        minRatio: 0.8,
        algorithm: 'gzip',
      }),
      new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime.*\.js/]),
    ],
  }
}
