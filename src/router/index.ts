import { createRouter, createWebHashHistory } from 'vue-router'
// 引入类型的方式，一般需要加 type ，不加也不会报错
// import type { RouteRecordRaw } from 'vue-router'

import localcache from '@/utils/cache'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/main', component: () => import('components/main/main.vue') },
  { path: '/login', component: () => import('@/views/login/login.vue') },
  { path: '/home', component: () => import('@/views/home/home.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localcache.getCache('token')
    if (!token) return '/login'
  }
})

export default router
