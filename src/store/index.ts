import { createStore, Store, useStore as useVuexStore } from 'vuex'
import type { RootState, StoreType } from './types'

import login from './login/login'
import app from './app/app'
import system from './system/system'

const store = createStore<RootState>({
  state() {
    return {
      isRoot: true
    }
  },
  modules: {
    login,
    app,
    system
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('app/loadLocalapp')
}

export function useStore(): Store<StoreType> {
  return useVuexStore()
}

export default store
