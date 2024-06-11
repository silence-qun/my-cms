import { sum } from '@/utils/test1'
if (module.hot) {
  module.hot.accept('@/utils/test1', () => {
    console.log('test1发生了热替换')
  })
}

const { format } = require('@/utils/test2')

import '@/ts/class.ts'

import { createApp } from 'vue'

import '@/utils/ele'

import '@/css/index.css'
import '@/css/index.less'

import App from './vue/app'

console.log(sum(1, 2))
console.log(format(1000))
// const app = createApp({
//   template: '<h2>{{title}}</h2>',
//   data() {
//     return {
//       title: 'vue组件'
//     }
//   }
// })
const app = createApp(App)
app.mount('#app')
