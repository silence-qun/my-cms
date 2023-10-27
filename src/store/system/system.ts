import { Module } from 'vuex'
import { RootState } from '../types'
import { SystemState } from './types'
import { getPageListRe } from '@/service/system/system'

const SystemModule: Module<SystemState, RootState> = {
  namespaced: true,
  state() {
    return {
      userList: []
    }
  },
  mutations: {
    setUserList(state, userList) {
      state.userList = userList
    }
  },
  actions: {
    getPageList({ commit }, preload: any) {
      getPageListRe(preload.url).then((data) => {
        commit('setUserList', data)
      })
    }
  }
}

export default SystemModule
