<template>
  <div>
    <div class="w-full mx-auto max-w-xl">
      <h1 class="text-center text-3xl font-bold mb-3">
        Welcome, please Log In
      </h1>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Username
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            v-model="username"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            v-model="password"
            placeholder="Your Password"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="login"
          >
            Sign In
          </button>
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    username: 'admin',
    password: 'suporte'
  }),
  methods: {
    // Login the user info
    async login() {
      await this.$http
        .post(
          `http://localhost:8090/usuario/autenticar?login=${this.username}&senha=${this.password}`
        )
        .then((data) => {
          // check if user info was returned and not null
          if (data.data.login != null) {
            // Everything is good so we proceed to set out $store.user to be the logged user
            this.$store.dispatch('login', data.data)
            // send the user back to main page
            this.$router.push({ name: 'Paises' })
            // Display welcome message
            this.$toasted.show(`Welcome ${this.$store.getters.user.nome}!!`, {
              position: 'top-center',
              duration: 1000,
              type: 'success'
            })
          } else {
            // if null, it means that the credentials are wrong, so send a message to the user
            this.$toasted.show('Invalid credentials', {
              position: 'top-center',
              duration: 1000,
              type: 'error'
            })
          }
        })
        .catch((err) => alert(err))
    }
  }
}
</script>

<style></style>
