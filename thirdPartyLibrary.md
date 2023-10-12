# 第三方库集成配置信息

- [vue.config.js](#vue.config.js)
- [vue-router](#vue-router)
- [vuex](#vuex)
- [Element Plus](#element-plus)
- [axios](#axios)

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
5. 报错处理  
   在组件中提示 [$store](https://vuex.vuejs.org/guide/typescript-support.html#typing-store-property-in-vue-component '$store') 错误时  
   ![vuex_pic_0](./src/assets/md_img/vuex_pic_0.jpg 'vuex_pic_0')  
   需要新建 vuex.d.ts 文件，添加如下代码

```javascript
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store
  }
}
```

该代码不能添加到 shims-vue.d.ts 中，在引用组件时会报“找不到模块“xxx/xxx/xxx.vue”或其相应的类型声明”的错误  
![vuex_pic_1](./src/assets/md_img/vuex_pic_1.jpg 'vuex_pic_1')  
且在 shims-vue.d.ts 中添加以下代码也无用

```javascript
declare let $store: any
```

## element-plus[↑](#第三方库集成配置信息)

#### 基于 vue3 的组件库

1. 安装

```bahs
npm install element-plus --save
```

2. 全局引用

```javascript
import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)

app.mount('#app')
```

Volar 支持  
 在 tsconfig.json 中通过 compilerOptions.types 指定全局组件的类型

```json
{
  "compilerOptions": {
    "types": ["element-plus/global"]
  }
}
```

3. 按需引用

- 单页面引用

```vue
<template>
  <el-button>按需引用</el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-button.css'

export default defineComponent({
  components: { ElButton }
})
</script>
```

自动引用样式：  
(1) 使用 babel-plugin-import 插件  
安装：

```bash
npm install babel-plugin-import -D
```

配置 babel.config.js

```javascript
module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        customName: (name) => {
          name = name.slice(3)
          return `element-plus/es/components/${name}/index.mjs`
          // return `element-plus/lib/components/${name}/index.js`
        },
        customStyleName: (name) => {
          return `element-plus/theme-chalk/${name}.css`
        }
      }
    ]
  ]
}
```

注意：customName 中路径是 es，lib 下会报错，且需要带 index.mjs  
当前 element-plus 版本为 2.3.14，vue 版本为 3.2.13，不同版本的 element-plus 配置不一样

配置 main.ts，引入基础样式

```typescript
import 'element-plus/theme-chalk/base.css'
```

组件使用

```vue
<template>
  <el-button>按需引用</el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
// import 'element-plus/theme-chalk/base.css'
// import 'element-plus/theme-chalk/el-button.css'

export default defineComponent({
  components: { ElButton }
})
</script>
```

可以全局注册组件，并封装：新建 global 文件夹，按注册内容分别封装函数

(2) 官网[按需引用](https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5 '按需引用')示例：
安装插件

```bash
npm install unplugin-vue-components unplugin-auto-import -D
```

配置 vue.config.js

```javascript
const { defineConfig } = require('@vue/cli-service')

const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
})
```

无需再局部或全局注册组件

## axios[↑](#第三方库集成配置信息)

1. 安装

```bash
npm install axios
```

注：用来测试请求的网站--[httpbin.org](https://httpbin.org/ 'httpbin.org')

2. 新建 service 文件夹，用来封装 axios
