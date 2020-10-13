<template>
  <div>
    <div class="w-full mx-auto max-w-xl">
      <h1 class="text-center text-3xl font-bold mb-3">Welcome, please Log In</h1>
      {{ $store.getters.loggedIn }}
      {{ $store.getters.user }}
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            v-model="email"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
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
          <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
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
    email: 'aus@gmail.com',
    password: 'sonic123',
  }),
  methods: {
    // Login the user info
    async login() {
      try {
        await this.$store.dispatch('login', { email: this.email, password: this.password }).then(() => {
          console.log('redirectfgsbgiaoubguidgh')
        })
      } catch (err) {
        console.error(err)
        this.$toasted.show(err, {
          position: 'top-center',
          duration: 2000,
          type: 'error',
        })
      }
    },
  },
}
</script>

<style></style>
