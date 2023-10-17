import { createRouter, createWebHashHistory } from 'vue-router'
// 引入类型的方式，一般需要加 type ，不加也不会报错
// import type { RouteRecordRaw } from 'vue-router'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/main', component: () => import('components/main/main.vue') },
  { path: '/login', component: () => import('@/views/login/login.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
