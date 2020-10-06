import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Paises from '../views/Paises.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Paises',
    component: Paises,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.getters.loggedIn) next({ name: 'Login' })
  else if (to.name == 'Login' && store.getters.loggedIn) next({ name: 'Home' })
  else next()
})

export default router
