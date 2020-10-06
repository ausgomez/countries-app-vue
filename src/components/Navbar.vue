<template>
  <nav
    class="flex items-center justify-between flex-wrap bg-teal-600 p-6 rounded"
  >
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <span class="font-semibold text-xl tracking-tight">
        <i class="bx bxs-map"></i> Locations App</span
      >
    </div>
    <div class="block lg:hidden">
      <button
        class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-md lg:flex-grow">
        <router-link
          to="/"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
          <i class="bx bx-home-alt bx-lg"></i> Home
        </router-link>
        <router-link
          to="/"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
          <i class="bx bxs-map-pin"></i> Paises
        </router-link>
      </div>
      <div>
        <span class="mr-6 text-white font-bold"> {{ user }}</span>
        <router-link
          v-if="!loggedIn"
          class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          to="/login"
        >
          Login
        </router-link>
        <button
          v-else
          class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import store from '../store'

export default {
  computed: {
    loggedIn() {
      return store.getters.loggedIn
    },
    user() {
      return store.getters.user
    }
  },
  methods: {
    logout() {
      store.dispatch('logout')
      localStorage.removeItem('user')
    }
  }
}
</script>

<style></style>
