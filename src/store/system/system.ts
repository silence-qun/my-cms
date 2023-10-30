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
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'User':
            return state.userList
        }
      }
    }
  },
  mutations: {
    setUserList(state, userList) {
      state.userList = userList
    }
  },
  actions: {
    getPageList({ commit }, preload: any) {
      const pageName = preload.pageName
      getPageListRe(pageName).then((data) => {
        commit(`set${pageName}List`, data)
      })
    }
  }
}

export default SystemModule
