import { createRouter, createWebHashHistory } from 'vue-router'
// 引入类型的方式，一般需要加 type ，不加也不会报错
// import type { RouteRecordRaw } from 'vue-router'

import localcache from '@/utils/cache'

const routes = [
  { path: '/', redirect: '/home' },
  // { path: '/main', component: () => import('components/main/main.vue') },
  { path: '/login', name: 'login', component: () => import('@/views/login/login.vue') },
  { path: '/home', name: 'home', component: () => import('@/views/home/home.vue') },
  { path: '/:pathMatch(.*)*', name: '404', component: () => import('@/views/404/404.vue') }
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
