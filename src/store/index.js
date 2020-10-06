import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    REMOVE_USER(state) {
      state.user = null
    }
  },
  actions: {
    login(ctx, data) {
      console.log('user to be ', data)
      ctx.commit('SET_USER', data)
    },
    logout(ctx) {
      ctx.commit('REMOVE_USER')
    }
    // checkUser(ctx) {}
  },
  getters: {
    user(state) {
      return state.user
    },
    loggedIn(state) {
      return !!state.user
    }
  },
  modules: {}
})
