import { createApp } from 'vue'
import { globalRegister } from './global'

import App from './App.vue'

import router from './router'
import store from './store'

import './assets/css/index.less'

// import './mock'

// import './service/axios_demo'

// 全局引用
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// 按需引用时，导入基础样式
// import 'element-plus/theme-chalk/base.css'

const app = createApp(App)

// 用法一
// globalRegister(app)
// 用法二
app.use(globalRegister)

app.use(router)
app.use(store)
// app.use(ElementPlus)

app.mount('#app')
