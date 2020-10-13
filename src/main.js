import Vue from 'vue'
import App from './App.vue'
import store from './store'
import '@/assets/css/tailwind.css'
import axios from 'axios'
import Toasted from 'vue-toasted'
import { appwrite } from '@/utils'

Vue.use(Toasted)

Vue.config.productionTip = false

Vue.prototype.$appwrite = appwrite
Vue.prototype.$baseURL = 'http://localhost:8090'

new Vue({
  store,
  render: function(h) {
    return h(App)
  },
}).$mount('#app')
