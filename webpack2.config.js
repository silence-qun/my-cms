const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { default: loader } = require('vue-loader')

module.exports = {
  entry: {
    // main: './src/main.js',
    // index: './src/index.js',

    // 去重代码方式一
    // 将 loadsh 单独打包到一个文件中，手动配置依赖，避免重复
    // dependOn 选项的也可以为字符串数组
    // 写法一：
    // main: { import: './src/main.js', dependOn: 'loadsh' },
    // index: { import: './src/index.js', dependOn: 'loadsh' },
    // loadsh: 'loadsh',
    // 写法二：
    main: { import: './src/main.js', dependOn: 'shared' },
    index: { import: './src/index.js', dependOn: 'shared' },
    shared: ['loadsh'],
  },
  output: {
    filename: '[name].bundle.js',

    // 用于动态加载模块的文件名 import()
    // 这些文件名需要在运行时根据 chunk 发送的请求去生成
    // 要在 webpack runtime 输出 bundle 值时，将 chunk id 的值对应映射到占位符(如 [name] 和 [chunkhash])
    // 默认使用 [id].js 或从 output.filename 中推断出的值（[name] 会被预先替换为 [id] 或 [id].）
    chunkFilename: '[name].chunk.js',
  },
  // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)
  externals: {
    // 库名: 全局访问的变量
    lodash: '_',
    dayjs: 'dayjs',
  },
  optimization: {
    // 告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer定义的插件压缩 bundle
    // 默认为 true
    minimize: true,

    // 允许你通过提供一个或多个定制过的 TerserPlugin 实例，覆盖默认压缩工具(minimizer)
    minimizer: [
      new TerserPlugin({
        // 是否将注释剥离到单独的文件中
        // 默认情况下，仅剥离 /^\**!|@preserve|@license|@cc_on/i 正则表达式匹配的注释，其余注释会删除
        // 如果原始文件名为 foo.js ，则注释将存储到 foo.js.LICENSE.txt
        extractComments: false,

        // 使用多进程并发运行以提高构建速度，并发运行的默认数量： os.cpus().length - 1
        // 类型： Boolean|Number 默认值： true
        parallel: true,

        // Terser 配置项
        terserOptions: {
          mangle: true, // Note `mangle.properties` is `false` by default.
          toplevel: false,
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      // 这表明将选择哪些 chunk 进行优化
      // 当提供一个字符串，有效值为 all，async（默认值）和 initial
      // 设置为 all 可能特别强大，因为这意味着 chunk 可以在异步和非异步 chunk 之间共享
      chunks: 'all',

      // 生成 chunk 所需的主 chunk（bundle）的最小体积（以字节为单位）缩减
      // 这意味着如果分割成一个 chunk 并没有减少主 chunk（bundle）的给定字节数，它将不会被分割，即使它满足 splitChunks.minSize
      minSize: 20000,

      // 将大于 maxSize 个字节的 chunk 分割成较小的部分
      // 这些较小的部分在体积上至少为 minSize（仅次于 maxSize）
      // maxSize 只是一个提示，当模块大于 maxSize 或者拆分不符合 minSize 时可能会被违反
      maxSize: 30000,

      // 拆分前必须共享模块的最小 chunks 数
      minChunks: 1,

      // 缓存组可以继承和/或覆盖来自 splitChunks.* 的任何选项
      // 但是 test、priority 和 reuseExistingChunk 只能在缓存组级别上进行配置
      // 将它们设置为 false以禁用任何默认缓存组
      cacheGroups: {
        cacheGroups: {
          defaultVendors: {
            // 控制此缓存组选择的模块。省略它会选择所有模块
            // 它可以匹配绝对模块资源路径或 chunk 名称。匹配 chunk 名称时，将选择 chunk 中的所有模块
            // Note the usage of `[\\/]` as a path separator for cross-platform compatibility.
            test: /[\\/]node_modules[\\/]|vendor[\\/]analytics_provider|vendor[\\/]other_lib/,

            // 仅在初始 chunk 时才允许覆盖文件名
            // 也可以在 output.filename 中使用所有占位符
            filename: '[name].vendors.js',
          },
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2,

            // 一个模块可以属于多个缓存组
            // 优化将优先考虑具有更高 priority（优先级）的缓存组
            // 默认组的优先级为负，以允许自定义组获得更高的优先级（自定义组的默认值为 0）
            priority: -20,
          },
        },
      },
    },

    // boolean = true string: 'global'
    // 告诉 webpack 去决定每个模块的导出内容是否被使用
    // 由 optimization.usedExports 收集的信息会被其它优化手段或者代码生成使用
    // 比如未使用的导出内容不会被生成，当所有的使用都适配，导出名称会被处理做单个标记字符
    // 压缩工具执行清除死代码时会受益于该选项，而且能够去除未使用的导出内容
    usedExports: true,

    // boolean = true string: 'flag'
    // 告诉 webpack 去辨识 package.json 中的 sideEffects 标记或规则
    // 以跳过那些当导出不被使用且被标记为不包含副作用的模块
    sideEffects: true,
  },
  module: {
    rules: [
      // 使用自定义 loader
      {
        test: /\.js$/i,
        // use: './loaders/s-loader.js',
        // 配置 resolveLoader 可简写为
        use: {
          loader: 's-loader',
          options: {
            name: 's',
            age: 18,
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        sideEffects: true,
      },
      {
        test: /\.md$/i,
        use: ['html-loader', 's-md-loader'],
      },
    ],
  },
  resolveLoader: {
    modules: ['node_modules', './loaders'],
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main'],
  },
  plugins: [
    // 当代码中遇到某一个变量找不到时，通过 webpack.ProvidePlugin，自动导入对应的库
    new webpack.ProvidePlugin({
      // 如果你遇到了至少一处用到 _ 变量的模块实例，那请你将 lodash package 引入进来，并将其提供给需要用到它的模块
      _: 'lodash',
      get: ['axios', 'get'],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:6].css',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
}
