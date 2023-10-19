import { createStore } from 'vuex'
import type { RootState } from './types'

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

export default store
