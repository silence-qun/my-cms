import { Module } from 'vuex'
import type { LoginState } from './types'
import type { RootState } from '../types'

import { loginRe, userInfoRe } from '@/service/login/login'
import { IAccount } from '@/service/login/types'

import localCache from '@/utils/cache'

const LoginModule: Module<LoginState, RootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: null
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async accountLogin({ commit }, preload: IAccount) {
      const { token } = await loginRe(preload)
      commit('setToken', token)
      localCache.setCache('token', token)

      const userInfo = userInfoRe()
      console.log(userInfo)
      commit('setUserInfo', userInfo)
    }
  }
}

export default LoginModule
