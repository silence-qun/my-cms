import { createStore, Store, useStore as useVuexStore } from 'vuex'
import type { RootState, StoreType } from './types'

import login from './login/login'

const store = createStore<RootState>({
  state() {
    return {
      isRoot: true
    }
  },
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<StoreType> {
  return useVuexStore()
}

export default store
