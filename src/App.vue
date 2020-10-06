<template>
  <div id="app">
    <Navbar />
    <div class="container mx-auto mt-4 shadow-md">
      <router-view class="min-h-64 bg-gray-700 rounded text-white p-10" />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>
