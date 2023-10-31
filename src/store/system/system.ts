import { Module } from 'vuex'
import { RootState } from '../types'
import { SystemState } from './types'
import { getPageListRe } from '@/service/system/system'
import localCache from '@/utils/cache'

const SystemModule: Module<SystemState, RootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      menuList: []
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        // 获取列表方法一
        // switch (pageName) {
        //   case 'User':
        //     return state.userList
        // }
        // 获取列表方法二
        const name = pageName.toLowerCase()
        return (state as any)[`${name}List`]
      }
    }
  },
  mutations: {
    setUserList(state, userList) {
      state.userList = userList
    },
    setMenuList(state, menuList) {
      state.menuList = menuList
    }
  },
  actions: {
    getPageList({ commit }, preload: any) {
      const pageName = preload.pageName
      console.log(preload.query)
      if (pageName === 'Menu') {
        const menu = localCache.getCache('menu')
        if (menu) commit('setMenuList', menu)
      } else {
        getPageListRe(pageName).then((data) => {
          commit(`set${pageName}List`, data)
        })
      }
    }
  }
}

export default SystemModule
