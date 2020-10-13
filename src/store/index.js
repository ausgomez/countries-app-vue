import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { appwrite } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    REMOVE_USER(state) {
      state.user = null
    },
  },
  actions: {
    async login(ctx, data) {
      console.log('user to be ', data)
      try {
        console.log('creating session')
        appwrite.account.createSession(data.email, data.password).then(async () => {
          console.log('everything good with login')
          await ctx.dispatch('checkUser')
        })
      } catch (err) {
        console.error('ERROR!', err)
        throw err
      }
    },
    async logout(ctx) {
      await appwrite.account.deleteSession('current')
      ctx.commit('REMOVE_USER')
    },
    async checkUser(ctx) {
      console.log('checking for user')
      try {
        const response = await appwrite.account.get()
        ctx.commit('SET_USER', response)
      } catch (err) {
        if (err == 'Error: Unauthorized') return
        console.error(err)
      }
    },
  },
  getters: {
    user(state) {
      return state.user
    },
    loggedIn(state) {
      return !!state.user
    },
    token: (state) => state.user.token,
    isAdmin: (state) => true,
  },
  modules: {},
})
