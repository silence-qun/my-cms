const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const { merge } = require('webpack-merge')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const resolveApp = require('./paths')
const devConfig = require('./webpack.dev')
const prodConfig = reuqire('./webpack.prod')

const commonConfig = {
  // 基础目录，绝对路径，用于从配置中解析入口点(entry point)和 加载器(loader)
  // 默认使用 Node.js 进程的当前工作目录，但是推荐在配置中传入一个值
  // 这使得你的配置独立于 CWD(current working directory, 当前工作目录)
  // context: path.resolve(__dirname, '../'),

  // entry 设置相对路径时，并不是相对于文件所在的路径，而是相对于 context 配置的路径
  entry: './src/main1.js',
  output: {
    // 相对于当前路径
    path: resolveApp('./build'),
  },
  resolve: {
    extensions: ['.js', '.json', '.wasm', '.vue', '.ts', '.jsx'],
    alias: {
      '@': resolveApp('./src'),
      vue: resolveApp('./src/vue'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'img/[name].[hash:6][ext]',
        },
        parser: {
          dataUrlCondition: { maxSize: 100 * 1024 },
        },
      },
      {
        test: /\.(ttf|eot|woff2?)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:6][ext]',
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.ts$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'my title',
      template: './public/index.html',

      // {Boolean|String} true || 'head' || 'body' || false
      inject: true,

      // {Boolean}
      cache: true,

      // {Boolean|Object}
      // minify: true,
      minify: {
        collapseWhitespace: true, // 折叠空格
        keepClosingSlash: true,
        removeComments: true, // 是否移除注释
        removeRedundantAttributes: true, // 是否移除多余的属性
        removeScriptTypeAttributes: true, // 是否移除 script 标签的 type
        removeStyleLinkTypeAttributes: true, // 是否移除 link 标签的 type
        useShortDoctype: true,
        removeEmptyAttributes: true, // 是否移除空属性
        minifyCSS: true, // 压缩 style 标签中和 style 属性中的 css，{Boolean|Object}
        minifyJS: true, // 压缩 script 标签中和事件属性中的 js，{Boolean|Object}
      },
    }),
    new DefinePlugin({
      BASE_URL: "'./'",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html', '**/.DS_Store'],
          },
        },
      ],
    }),
    new VueLoaderPlugin(),
    new webpack.DllReferencePlugin({
      context: resolveApp('./'),
      manifest: resolveApp('./dll/react.manifest.js'),
    }),
    new AddAssetHtmlPlugin({ filepath: resolveApp('./dll/dll_react.js') }),
  ],
}

module.exports = function (env) {
  const isDevelopment = env.development
  process.env.NODE_ENV = isDevelopment ? 'development' : 'production'

  const config = isDevelopment ? devConfig : prodConfig

  return merge(commonConfig, config)
}
