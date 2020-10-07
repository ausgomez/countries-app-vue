import axios from 'axios'
import store from '@/store'

const baseURL = 'http://localhost:8090'

export default {
  baseURL,
  check401: async (err) => {
    if (err.response.status == 401) {
      await axios
        .get(baseURL + '/usuario/renovar-ticket', {
          params: {
            token: store.getters.token
          }
        })
        .then(() => console.log('TOKEN RENEWED!!'))
        .catch((e) => console.err(e))
    }
  }
}
