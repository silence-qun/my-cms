import { Module } from 'vuex'
import type { LoginState } from './types'
import type { RootState } from '../types'

const LoginModule: Module<LoginState, RootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: null
    }
  },
  actions: {
    accountLogin({ commit }, preload: any) {
      console.log(preload)
    }
  }
}

export default LoginModule
