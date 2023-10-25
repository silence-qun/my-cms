import { Module } from 'vuex'
import type { RootState } from '../types'
import type { AppState } from './types'

import localCache from '@/utils/cache'

const AppModule: Module<AppState, RootState> = {
  namespaced: true,
  state() {
    return {
      sidebarOpen: true
    }
  },
  mutations: {
    setSidebarOpen(state, isOpen) {
      state.sidebarOpen = isOpen
      localCache.setCache('sidebarOpen', isOpen)
    }
  },
  actions: {
    loadLocalapp({ commit }) {
      const isOpen = localCache.getCache('sidebarOpen')
      commit('setSidebarOpen', isOpen ?? true)
    }
  }
}

export default AppModule
