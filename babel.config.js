const presets = [
  // '@babel/preset-env'
  // 使用 polyfill
  [
    '@babel/preset-env',
    {
      // false 不使用
      // usage 按需使用
      // entry 根据目标浏览器的全量使用，需要在项目入口文件中引入 import 'core-js/stable' import 'regenerator-runtime/runtime'
      // 引入 polyfill 时，在 webpack.config.js 中，配置 babel-loader 需添加 exclude: /node_modules/
      useBuiltIns: 'usage',
      // 安装没有指定版本时，安装的是最新版本，但默认使用是版本 2，可以手动设置\
      // 也可以通过 { version: string, proposals: boolean } 设置，来添加对提案的支持
      corejs: 3,
    },
  ],
  ['@babel/preset-react'],
  '@babel/preset-typescript',
]

const plugins = [
  //   [
  //     // 与 useBuiltIns 不可同时使用，该插件一般用于自写的工具库中
  //     '@babel/plugin-transform-runtime',
  //     {
  //       // 还需要安装 npm i @babel/runtime-corejs3 --save
  //       // 如果为 2，则还需要安装 npm i @babel/runtime-corejs2 --save
  //       corejs: 3,
  //     },
  //   ],
]

if (process.env.NODE_ENV === 'development') plugins.push('react-refresh/babel')

module.exports = {
  presets,
  plugins,
}
