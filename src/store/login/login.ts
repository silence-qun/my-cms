import { Module } from 'vuex'
import { h } from 'vue'
import { RouteRecordRaw, RouterView } from 'vue-router'
import type { LoginState } from './types'
import type { RootState } from '../types'
import { loginRe, userInfoRe, menuRe } from '@/service/login/login'
import { IAccount } from '@/service/login/types'

import localCache from '@/utils/cache'

import router from '@/router'

const LoginModule: Module<LoginState, RootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: null,
      menu: []
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setMenu(state, menu) {
      state.menu = menu

      const routes = getDynamicRoutes(menu)
      routes.forEach((route) => {
        router.addRoute('home', route)
      })
    }
  },
  actions: {
    async accountLogin({ commit }, preload: IAccount) {
      const { token } = await loginRe(preload)
      commit('setToken', token)
      localCache.setCache('token', token)

      const userInfo = await userInfoRe()
      commit('setUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      const menu = await menuRe()
      commit('setMenu', menu)
      localCache.setCache('menu', menu)

      router.push('/home')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) commit('setToken', token)

      const userInfo = localCache.getCache('userInfo')
      if (userInfo) commit('setUserInfo', userInfo)

      const menu = localCache.getCache('menu')
      if (menu) commit('setMenu', menu)
    }
  }
}

export default LoginModule

function getDynamicRoutes(menu: any[]): RouteRecordRaw[] {
  const routes = JSON.parse(JSON.stringify(menu))

  // 加载页面模块：实现一
  // const views = require.context('@/views', true, /\.vue$/)

  // routes.forEach((item: any) => {
  //   if (item.component !== 'Layout') {
  //     const component = views(`./${item.component}.vue`).default

  //     item.component = component
  //   } else {
  //     item.component = {
  //       render: () => h(RouterView)
  //     }
  //   }
  //   if (item.children && item.children.length) {
  //     item.children.forEach((child: any) => {
  //       if (child.component !== 'Layout') {
  //         const component = views(`./${child.component}.vue`).default
  //         console.log(component)

  //         child.component = component
  //       }
  //     })
  //   }
  // })
  // console.log(routes)

  // 加载页面模块：实现二
  const allRoutes: any[] = []
  const allFiles = require.context('../../views', true, /\.vue/)
  allFiles.keys().forEach((key) => {
    const route = require('../../views' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  const _getRoute = (menu: any[]) => {
    menu.forEach((item) => {
      if (item.component !== 'Layout') {
        const component = allRoutes.find((r) => r.__file.includes(item.component))
        item.component = component
      } else {
        item.component = {
          render: () => h(RouterView)
        }
      }
      if (item.children && item.children.length) {
        item.children.forEach((child: any) => {
          if (child.component !== 'Layout') {
            const component = allRoutes.find((r) => r.__file.includes(child.component))
            child.component = component
          }
        })
      }
    })
  }

  _getRoute(routes)

  return routes
}
