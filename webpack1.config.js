const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  // watch: true,
  entry: './src/main1.js',
  output: {
    filename: 'js/bundle.js', // 放在 js 文件夹下
    path: path.resolve(__dirname, './build'), // 打包后的输出目录，必须为绝对路径
    // assetModuleFilename: 'img/[name].[hash:6][ext]', // 自定义输出文件名一

    // 在打包后的静态资源前面进行一个路径的拼接
    // 一般生产环境设置为 /（加载服务器资源），开发环境设置为 ./（加载本地资源）
    // publicPath: './',
  },
  resolve: {
    extensions: ['.js', '.json', '.wasm', '.vue', '.ts', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      vue: path.resolve(__dirname, './src/vue'),
    },
  },
  devServer: {
    hot: true,

    // 指定本地服务所在的文件夹，默认为 /
    // 建议 devServer.publicPath 与 output.publicPath 相同
    // publicPath: '/abc',

    // 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要
    // 如果打包后的资源，又依赖其它资源，需要指定其依赖资源的路径
    // contentBase: path.join(__dirname, 'public'),

    // 开启此选项后，在文件（devServer.contentBase 选项下的文件）修改之后，会触发一次完整的页面重载
    // watchContentBase: true,

    // 在构建失败时不刷新页面作为回退
    // hotOnly: true,

    // 指定外部访问的 ip
    host: '0.0.0.0',
    port: 8080,
    open: true,
    compress: true,
    proxy: {
      // '/api': 'http://localhost:3000',
      '/api': {
        // 需要代理的地址
        // 对 /api/users 的请求会将请求代理到 http://localhost:3000/api/users
        target: 'http://localhost:3000',

        // 如果不希望传递/api，则需要重写路径
        pathRewrite: { '^/api': '' },

        // 默认情况下，将不接受在 HTTPS 上运行且证书无效的后端服务器，需设置
        secure: false,

        // 默认情况下，代理时会保留主机头的来源，可以将 changeOrigin 设置为 true 以覆盖此行为
        changeOrigin: true,
      },
    },

    // 解决 SPA 页面在路由跳转后，进行页面刷新返回404错误
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        // 只有一个 loader 时的简写
        // loader: 'css-loader',
        // use: 'css-loader'

        // 完整写法是使用 use 属性
        // use 属性中对象的属性有：loader、options、query（已被 options 替代）
        use: [
          // { loader: 'css-loader' }

          // 没有其它配置项时的简写
          // use 中取值顺序是从右到左
          'style-loader',

          // 'css-loader',
          {
            loader: 'css-loader',
            options: {
              // 用于处理 css 文件中使用 @import 导入的其它 css 文件
              // 1 就是需要之前 loader 的个数
              importLoaders: 2,
            },
          },

          // 如果有postcss.config.js配置文件，可直接使用
          'postcss-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       // plugins: [require('autoprefixer'), require('postcss-preset-env')],
          //       // 简写，是否能简写还得根据不同插件具体要求
          //       plugins: ['postcss-preset-env'],
          //     },
          //   },
          // },

          'less-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/i,
        // use: 'file-loader',
        // 文件名是默认使用 md4 生成的 128 位长度的哈希值
        // use: [
        //   {
        //     // loader: 'file-loader',
        //     // 使用 url-loader,配置和 file-loader 基本一致
        //     loader: 'url-loader',
        //     options: {
        //       // name: '[name].[hash:6].[ext]',
        //       // outputPath: 'img',
        //       // 合并写法
        //       name: 'img/[name].[hash:6].[ext]',

        //       // url-loader 配置
        //       // 限制 100kb 大小,小于 100kb 才转为 base64 格式
        //       limit: 100 * 1024,
        //     },
        //   },
        // ],

        // webpack5 使用资源模块类型
        type: 'asset',
        generator: {
          filename: 'img/[name].[hash:6][ext]', // 自定义输出文件名二
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
        use: [
          {
            loader: 'babel-loader',
            // 在 babel.config.js 中配置
            // options: {
            //   // presets: ['@babel/preset-env'],

            //   // 设置浏览器支持版本，会忽略 .browserslistrc 中的配置，但不建议在此设置
            //   // presets: [
            //   //   [
            //   //     '@babel/preset-env',
            //   //     {
            //   //       targets: ['chrome 88'],
            //   //     },
            //   //   ],
            //   // ],

            //   // 使用插件
            //   // plugins: ['@babel/plugin-transform-arrow-functions', '@babel/plugin-transform-block-scoping'],
            // },
          },
        ],
      },
      {
        test: /\.ts$/,
        // 处理 ts 文件方式一：使用 ts-loader
        // use: 'ts-loader',
        // 处理 ts 文件方式二：使用 babel-loader，需要安装配置：@babel/preset-typescript
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // 设置 html title,在模板中以 <%= htmlWebpackPlugin.options.title %> 方式获取值
      title: 'my title',
      // 指定模板
      template: './public/index.html',
    }),
    new DefinePlugin({
      BASE_URL: "'./'", // 由于本插件会直接替换文本，因此提供的值必须在字符串本身中再包含一个实际的引号
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          // 省略 to 时,会自动复制到出口文件夹下
          // to: './',
          globOptions: {
            // .DS_Store mac 电脑自动生成的文件
            // 文件前要加 **/
            ignore: ['**/index.html', '**/.DS_Store'],
          },
        },
      ],
    }),
    new VueLoaderPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
}
