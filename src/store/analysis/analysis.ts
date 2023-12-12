import { Module } from 'vuex'
import type { AnalysisState } from './types'
import type { RootState } from '../types'
import { goodsRe } from '@/service/analysis/analysis'

const AnalysisModule: Module<AnalysisState, RootState> = {
  namespaced: true,
  state() {
    return {
      goods: []
    }
  },
  mutations: {
    setGoods(state, goods) {
      state.goods = goods
    }
  },
  actions: {
    async getGoods({ commit }) {
      const data = await goodsRe()
      commit('setGoods', data)
    }
  }
}

export default AnalysisModule
