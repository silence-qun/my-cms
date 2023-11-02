import { Module } from 'vuex'
import { RootState } from '../types'
import { SystemState } from './types'
import { getPageListRe, deletePageDataRe } from '@/service/system/system'
import localCache from '@/utils/cache'
import { ElMessage } from 'element-plus'

enum TipType {
  User = '用户',
  Dept = '部门',
  Menu = '菜单'
}
type ITip = keyof typeof TipType

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
    },
    deletePageData({ dispatch }, preload: any) {
      const { pageName, id } = preload
      deletePageDataRe(pageName, id)
        .then(() => {
          ElMessage.success(`${TipType[pageName as ITip]}删除成功`)
          dispatch('getPageList', { pageName, query: {} })
        })
        .catch(() => {
          ElMessage.error(`${TipType[pageName as ITip]}删除成功`)
        })
    }
  }
}

export default SystemModule
