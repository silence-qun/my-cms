import { App, defineAsyncComponent } from 'vue'
import type { AsyncComponentLoader } from 'vue'

import Icon from '@/base-ui/icon.vue'

// interface Cpns {
//   [key: string]: AsyncComponentLoader
// }

// const cpns1: Cpns = {
//   QIcon: () => import('@/base-ui/icon.vue')
// }

const cpns = [Icon]

export default function (app: App): void {
  // 注册方法一
  // app.component('SIcon', Icon)

  // 注册方法二
  // for (const c in cpns1) {
  //   app.component(c, defineAsyncComponent(cpns1[c]))
  // }

  // 注册方法三
  for (const c of cpns) {
    app.component(c.name, c)
  }
}
