import { sum, add } from './utils/test1'

console.log(sum(1, 3))
console.log(add(1, 3))

// 使用 webpack magic comments 给 chunk 命名或选择不同模式的操作
// 可用作组件的懒加载，如 vue-router 懒加载
import(/* webpackChunkName: "test1" */ './utils/test1').then((res) => {
  console.log(res)
})
