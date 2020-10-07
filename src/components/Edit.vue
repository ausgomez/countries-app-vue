<template>
  <div
    class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center text-black font-bold"
  >
    <div
      class="modal-overlay absolute w-full h-full bg-black opacity-50 top-0 left-0 cursor-pointer"
      @click="close()"
    ></div>
    <div
      class="absolute w-auto max-w-md rounded overflow-hidden shadow-lg bg-gray-200"
    >
      <a class="cursor-pointer text-2xl text-gray-600 " @click="close">
        <i class="bx bx-x-circle absolute right-0 top-0 mr-3 mt-2"></i>
      </a>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2 text-black">
          <div class="mb-2">
            <h1 class="text-center text-2xl">Modify {{ pais.nome }}</h1>
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="nome"
            >
              Nome
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nome"
              type="text"
              placeholder="Nome"
              v-model="pais.nome"
            />
          </div>
          <div class="mb-2">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="sigla"
            >
              Sigla
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="sigla"
              type="text"
              placeholder="Sigla"
              v-model="pais.sigla"
            />
          </div>
          <div class="mb-2">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="gentilico"
            >
              Gentilico
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="gentilico"
              type="text"
              placeholder="Gentilico"
              v-model="pais.gentilico"
            />
          </div>
        </div>
      </div>
      <div class="px-6 pt-4 pb-2">
        <button
          :class="
            `${
              submitCheck
                ? 'bg-teal-600 hover:bg-teal-800'
                : 'bg-yellow-600 hover:bg-yellow-700 cursor-not-allowed'
            } w-full  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`
          "
          type="button"
          @click="submit"
        >
          Add Pais
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['pais'],
  data: () => ({}),
  created() {},
  methods: {
    close() {
      if (confirm('Unsaved changes will be lost')) {
        this.$emit('close')
      }
    },
    submit() {
      if (this.submitCheck) {
        this.pais = this.tempPais
        this.$emit('submit')
      } else {
        this.$toasted.show(`Missing Information`, {
          position: 'top-center',
          duration: 2000,
          type: 'error'
        })
      }
    }
  },
  computed: {
    // This will be checking if the informtation from the form is there or not
    submitCheck() {
      return (
        this.pais.nome != '' &&
        this.pais.sigla != '' &&
        this.pais.gentilico != ''
      )
    }
  }
}
</script>
