import { Module } from 'vuex'
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
      menu: null
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
      commit('setMenu', [menu])
      localCache.setCache('menu', [menu])

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
