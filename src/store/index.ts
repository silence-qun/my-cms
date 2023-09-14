import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      count: 100
    }
  }
})

export default store
