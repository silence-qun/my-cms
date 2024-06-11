const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = function (env) {
  return {
    mode: 'development',
    devServer: {
      hot: true,
      // publicPath: '/abc',
      // contentBase: path.join(__dirname, 'public'),
      // watchContentBase: true,
      // hotOnly: true,
      host: '0.0.0.0',
      port: 8080,
      open: true,
      compress: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          pathRewrite: { '^/api': '' },
          secure: false,
          changeOrigin: true,
        },
      },
      historyApiFallback: true,
    },
    plugins: [new ReactRefreshWebpackPlugin()],
  }
}
