<template>
  <div id="app">
    <Navbar />
    <div class="container mx-auto mt-4 shadow-md">
      <div class="min-h-64 bg-gray-700 rounded text-white p-10">
        <Countries v-if="user" />
        <Auth v-else />

        <p class="text-center text-gray-500 text-md">
          &copy;2020 Locations App made by
          <a class="text-blue-300 underline" href="https://auscode.me">Anstroy</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '@/views/Login'
import Countries from '@/views/Countries'
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar,
    Countries,
    Auth,
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
  },
  mounted() {
    this.$store.dispatch('checkUser')
  },
}
</script>
