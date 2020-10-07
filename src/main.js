import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'
import axios from 'axios'
import Toasted from 'vue-toasted'

Vue.use(Toasted)

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$baseURL = 'http://localhost:8090'

new Vue({
  router,
  store,
  render: function(h) {
    return h(App)
  }
}).$mount('#app')
