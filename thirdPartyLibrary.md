# 第三方库集成配置信息

- [vue.config.js](#vue.config.js)
- [vue-router](#vue-router)
- [vuex](#vuex)

## vue.config.js[↑](#第三方库集成配置信息)

#### 项目构建的配置信息

1. 使用 [vue cli](https://cli.vuejs.org/zh/config/ 'vue cli') 提供的配置项

```javascript
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  outputDir: 'build'
})
```

2. 使用 configureWebpack 项  
   如果值为一个对象，会通过 webpack-merge 合并到最终的配置中；  
   如果值为一个函数，则会接收被解析的配置作为参数。该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本

```javascript
const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  // 方式一：对象
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@': path.resolve(__dirname, 'src'),
  //       components: '@/components'
  //     }
  //   }
  // }
  // 方式二：函数
  configureWebpack: (config) => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, 'src'),
      components: '@/components'
    }
  }
})
```

3. 使用 chainWebpack  
   是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改

```javascript
const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src')).set('components', '@/components')
  }
})
```

## vue-router[↑](#第三方库集成配置信息)

1. 安装 [vue-router](https://router.vuejs.org/zh/guide/ 'vue-router')

```bash
npm install vue-router@4
```

2. 在 router/index.ts 中配置路由信息
3. 在 main.ts 中引入 router
4. 在组件中使用

## vuex[↑](#第三方库集成配置信息)

1. 安装 [vuex](https://vuex.vuejs.org/zh/guide/ 'vuex')

```bash
npm install vuexr@next --save
```

2. 在 store/index.ts 中配置路由信息
3. 在 main.ts 中引入 store
4. 在组件中使用
