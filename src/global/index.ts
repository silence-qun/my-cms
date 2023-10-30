import { App } from 'vue'
import registerIcons from './register-icons'
import registerCommon from './register-common'
import registerProperties from './register-properties'

export function globalRegister(app: App): void {
  // 用法一
  // registerElement(app)
  // 用法二
  // app.use(registerElement)
  app.use(registerIcons)
  app.use(registerCommon)
  app.use(registerProperties)
}
