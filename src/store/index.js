import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const baseURL = 'http://localhost:8090'

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
      localStorage.setItem('user', JSON.stringify(data))
    },
    logout(ctx) {
      ctx.commit('REMOVE_USER')
      localStorage.removeItem('user')
    },
    async renew(ctx) {
      await axios.get(baseURL + '/usuario/renovar-ticket')
    }
    // checkUser(ctx) {}
  },
  getters: {
    user(state) {
      return state.user
    },
    loggedIn(state) {
      return !!state.user
    },
    token: (state) => state.user.token,
    isAdmin: (state) => state.user.administrador
  },
  modules: {}
})
