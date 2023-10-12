import { App } from 'vue'
import registerElement from './register-element'

export function globalRegister(app: App): void {
  // 用法一
  // registerElement(app)
  // 用法二
  app.use(registerElement)
}
