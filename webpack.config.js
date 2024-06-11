// node工具，resolve用来拼接路径，__dirname获取当前文件的绝对路径
const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')

// const { merge } = require('webpack-merge')
// const commonConfig = require('./config/webpack.common.config.js')
// module.exports = merge(commonConfig, {...})

module.exports = {
  target: 'web', // 在webpack4中可配置，防止出现问题
  mode: 'development',
  // watch: true,
  devtool: 'source-map',
  entry: './src/mian.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'js/bundle.js',
    // assetModuleFilename: 'img/[name]_[hash][ext]', // 自定义输出文件名一
    // clean: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.wasm', '.vue', '.ts'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  devServer: {
    // contentBase: './test', // 这是webpack4的用法
    static: {
      directory: './test',
    },
    hot: true,
    // host: '0.0.0.0', // 在同一网段下的主机中，其它地方通过ip地址也可以访问
    port: 9090, // 开启端口
    open: true, // 打开默认浏览器
    compress: true, // 启用gzip compression
    proxy: {
      // 启用代理
      '/api': {
        target: 'http://localhost:7070',
        pathRewrite: { '^/api': '' },
        secure: false, // 默认情况下，将不接受在HTTPS上运行且证书无效的后端服务器。如果需要，改为false
        changeOrigin: true, // 默认情况下，代理时会保留主机头的来源，设置为true，可覆盖此行为
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        // 写法一（语法糖）
        // loader: 'css-loader'
        // use: 'css-loader'

        // 写法二（完整写法）
        use: [
          // {loader: 'css-loader'}
          // 如果没有其它配置，可以直接写

          // loader是从右到左取值（evaluate）/执行（execute）
          'style-loader',
          'css-loader',
          'less-loader',

          // 如果有postcss.config.js配置文件，可直接使用
          'postcss-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: [
          //         require('autoprefixer')
          //       ]
          //     }
          //   }
          // }
        ],
      },
      // {
      //   test: /\.less$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'less-loader'
      //   ]
      // },
      // {
      //   test: /\.(jpe?g|png|svg|gif)$/i,
      //   // dependency: { not: ['url'] }, // 解决webpack5中使用file-loader导致图片不显示问题
      //   // use: 'file-loader',
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         esModule: false,
      //         // outputPath: 'img', // 或直接写在name中
      //         name: 'img/[name]_[hash:8].[ext]'
      //       }
      //     }
      //   ],
      //   type: 'javascript/auto', // 解决webpack5中使用file-loader导致图片不显示问题
      // },
      // {
      //   test: /\.(jpe?g|png|svg|gif)$/i,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         esModule: false,
      //         name: 'img/[name]_[hash:8].[ext]',
      //         limit: 60 * 1024
      //       }
      //     }
      //   ],
      //   type: 'javascript/auto', // 解决webpack5中使用file-loader导致图片不显示问题
      // },
      {
        test: /\.(jpe?g|png|svg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'img/[name]_[hash:8][ext]', // 自定义输出文件名二
        },
        parser: {
          dataUrlCondition: {
            maxSize: 60 * 1024, // 默认为8kb
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        // 一、webpack5用法
        type: 'asset/resource',
        generator: {
          filename: 'font/[name]_[hash:8][ext]',
        },

        // 二、使用file-loader
        // use: {
        //   loader: 'file-loader',
        //   options: {
        //     name: 'font/[name]_[hash:8].[ext]'
        //   }
        // },
        // type: 'javascript/auto',
      },
      {
        // test指定的是规则生效的文件
        test: /\.ts$/,
        // 指定要使用loader
        use: [
          // 配置babel
          {
            // 指定加载器
            loader: 'babel-loader',
            // 设置babel
            options: {
              // 设置预定义环境
              presets: [
                [
                  // 指定环境插件
                  '@babel/preset-env',
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      chrome: '48',
                      ie: '11',
                    },
                    // 指定corejs版本
                    corejs: '3',
                    // 使用corejs的方式 "usage"表示按需加载
                    useBuiltIns: 'usage',
                  },
                ],
              ],
            },
          },
          'ts-loader',
        ],
        // 要排除的文件
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     // 使用插件
        //     // plugins: [
        //     //   '@babel/plugin-transform-arrow-functions',
        //     //   '@babel/plugin-transform-block-scoping'
        //     // ]

        //     // 使用preset
        //     presets: [
        //       '@babel/preset-env'
        //     ]
        //   }
        // }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'my title',
    }),
    new DefinePlugin({
      BASE_URL: "'./'", // 由于本插件会直接替换文本，因此提供的值必须在字符串本身中再包含一个实际的引号
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: './',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new VueLoaderPlugin(),
  ],
}
