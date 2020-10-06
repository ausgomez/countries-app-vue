<template>
  <div class="">
    hey
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  components: {},
  methods: {
    openLoading() {
      const loading = this.$vs.loading()
      setTimeout(() => {
        loading.close()
      }, 3000)
    }
  }
}
</script>
