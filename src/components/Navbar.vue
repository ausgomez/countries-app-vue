<template>
  <nav class="flex items-center justify-between flex-wrap bg-teal-600 p-6 rounded">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <span class="font-semibold text-xl tracking-tight"> <i class="bx bxs-map"></i> Locations App</span>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-md lg:flex-grow"></div>
      <div>
        <span v-if="loggedIn" class="mr-6 text-white font-bold"
          >Welcome, {{ user.name }} {{ user.administrador ? 'Admin' : '' }}</span
        >
        <a
          v-if="!loggedIn"
          class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          href="/login"
        >
          Login
        </a>
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
    // These are trackers of the user state for the navbar
    loggedIn() {
      return store.getters.loggedIn
    },
    user() {
      return store.getters.user
    },
  },
  methods: {
    /* LOGOUT CLICK */
    logout() {
      // Call the $store.logout
      store.dispatch('logout')
      // display a goodbye message
      this.$toasted.show('See you later', {
        position: 'top-center',
        duration: 1000,
        type: 'info',
      })
    },
  },
}
</script>

<style></style>
