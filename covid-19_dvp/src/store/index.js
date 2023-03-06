import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,
  },
  getters: {
  },
  mutations: {
    loginIn(state, newState) {
      state.isLogin = newState;
    },
  },
  actions: {
  },
  modules: {
  }
})
