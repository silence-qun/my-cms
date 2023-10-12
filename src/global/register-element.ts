import { App } from 'vue'
import 'element-plus/theme-chalk/base.css'

import { ElButton, ElCard } from 'element-plus'

const components = [ElButton, ElCard]

export default function (app: App): void {
  for (const c of components) {
    app.component(c.name, c)
  }
}
