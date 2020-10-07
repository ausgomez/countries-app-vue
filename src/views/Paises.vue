<template>
  <div>
    <EditForm
      :pais="currentPais"
      v-if="modalToggle"
      @close="modalToggle = false"
      @submit="updatePais"
    />
    <div class="flex flex-wrap md:flex-row justify-between items-center mb-4">
      <h1 class="text-5xl font-bold">Paises</h1>
      <div
        class="flex justify-around items-center order-last md:order-none"
        v-if="!editing"
      >
        <input
          type="text"
          class="bg-gray-600 rounded-l-full text-2xl p-1 shadow text-center h-10"
          placeholder="Search for Paises"
          v-model="query"
        />
        <button
          class="bg-teal-600 p-2 rounded-r-full text-xl h-10 w-10"
          @click="lookupPaises"
        >
          <i class="bx bx-search-alt"></i>
        </button>
      </div>
      <button
        v-if="!editing"
        class="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded"
        @click="editing = true"
      >
        <i class="bx bx-pencil"></i> Edit
      </button>
      <button
        v-else
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        @click="editing = false"
      >
        <i class="bx bx-pencil"></i> Finish
      </button>
    </div>
    <div class="flex flex-wrap md:flex-row">
      <div v-if="editing" class="w-full md:w-1/3 pb-6 flex justify-center">
        <div
          class="w-full md:mx-3 rounded overflow-hidden shadow-lg bg-gray-200"
        >
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-black">
              <div class="mb-2">
                <h1 class="text-center text-2xl">Add Pais</h1>
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
                  v-model="newPais.nome"
                  v-on:keyup.enter="addPais"
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
                  v-model="newPais.sigla"
                  v-on:keyup.enter="addPais"
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
                  v-model="newPais.gentilico"
                  v-on:keyup.enter="addPais"
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
              @click="addPais"
            >
              Add Pais
            </button>
          </div>
        </div>
      </div>

      <div
        v-for="pais in paises"
        :key="pais.id"
        class="w-full md:w-1/3 md:pr-3 lg:pr-0 pb-6 flex justify-center"
      >
        <div
          class="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200 relative"
        >
          <button
            v-if="editing"
            class="bg-red-500 w-sm absolute top-0 right-0 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="removePais(pais)"
          >
            <i class="bx bxs-trash"></i>
          </button>
          <img
            class="w-full"
            :src="`https://picsum.photos/id/${pais.id}/300/100`"
            :alt="pais.nome"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-black">
              {{ pais.nome }} ({{ pais.sigla }})
            </div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              facilis omnis sed! Molestiae
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span
              class="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
            >
              <span>Language: </span>
              <span>{{ pais.gentilico }}</span>
            </span>

            <p
              v-if="editing"
              @click="clickEditPais(pais)"
              class="absolute bottom-0 right-0 text-gray-900 cursor-pointer p-3"
            >
              <span class="underline">Edit </span>
              <span class="text-xl">
                <i class="bx bxs-pencil"></i>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div
        class="w-full bg-gray-800 flex-col h-64 flex items-center justify-center"
        v-if="paises.length === 0"
      >
        <div class="text-4xl ">
          No results found
        </div>
      </div>
    </div>

    <div
        class="w-full bg-gray-800 flex-col h-64 flex items-center justify-center"
        v-if="loading"
      >
        <div class="text-5xl ">
          <i class="bx bx-radio-circle bx-burst bx-lg"></i>
          <i class="bx bx-radio-circle bx-burst bx-lg"></i>
          <i class="bx bx-radio-circle bx-burst bx-lg"></i>
          <i class="bx bx-radio-circle bx-burst bx-lg"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditForm from '@/components/Edit'
import utils from '@/utils'

export default {
  components: {
    EditForm
  },
  data: () => ({
    paises: [],
    editing: false,
    newPais: { id: 0, nome: '', sigla: '', gentilico: '' },
    modalToggle: false,
    currentPais: {},
    query: '',
    loading: false
  }),

  computed: {
    // This will be checking if the informtation from the form is there or not
    submitCheck() {
      return (
        this.newPais.nome != '' &&
        this.newPais.sigla != '' &&
        this.newPais.gentilico != ''
      )
    }
  },

  created() {
    /* Upon creation, we will fetch the paises from the backend */
    this.fetchPaises()
  },

  methods: {
    async lookupPaises() {
      this.loading = true
      this.paises = []
      await this.$http
        .get(utils.baseURL + '/pais/pesquisar', {
          params: {
            filtro: this.query,
            token: this.$store.getters.token
          }
        })
        .then((data) => (this.paises = data.data))
        .catch((err) => {
          utils.check401(err)
          this.lookupPaises()
        })

      this.loading = false
    },

    clickEditPais(pais) {
      this.currentPais = { ...pais }
      this.modalToggle = true
    },

    async updatePais() {
      const pos = this.paises.findIndex((p) => p.id === this.currentPais.id)
      this.paises[pos] = this.currentPais
      this.modalToggle = false
      this.currentPais = {}
      this.$toasted.show('Pais Info updated!', {
        position: 'top-center',
        duration: 2000,
        type: 'default'
      })
    },

    async fetchPaises() {
      this.loading = true
      await this.$http
        .get(utils.baseURL + '/pais/listar', {
          params: {
            token: this.$store.getters.token
          }
        })
        .then((data) => (this.paises = data.data))
        .catch((err) => {
          utils.check401(err)
          this.fetchPaises()
        })

      this.loading = false
    },

    /* Adding a new Pais to the database */
    async addPais() {
      // Making sure that the form is not missing any info
      if (!this.submitCheck) {
        this.$toasted.show(`Missing Information`, {
          position: 'top-center',
          duration: 2000,
          type: 'error'
        })
        return
      }

      // If everything is there in the form, proceed to posting the request to the backend
      await this.$http
        .post(
          utils.baseURL + `/pais/salvar?token=${this.$store.getters.token}`,
          this.newPais
        )
        .then((data) => {
          // Once the data is sent to the backend, push the new pais to the local array
          this.paises.unshift(data.data)
          // Notify the user
          this.$toasted.show(`Pais ${this.newPais.nome} added!`, {
            position: 'top-center',
            duration: 2000,
            type: 'success'
          })
          // Then clear the newPais object (clear form)
          this.newPais = { id: 0, nome: '', sigla: '', gentilico: '' }
        })
        .catch((err) => {
          utils.check401(err)
          this.addPais()
        })
    },

    /* REMOVING A PAIS FROM THE LIST */
    async removePais(pais) {
      // Ask the user to confirm first
      if (!confirm(`Are you sure to delete ${pais.nome}? 🙄`)) return

      // If the user confirmed, proceed to call the POST request
      await this.$http
        .get(
          utils.baseURL +
            `/pais/excluir?id=${pais.id}&token=${this.$store.getters.token}`
        )
        .then((data) => {
          // Remove the deleted pais from the local array using a simple Array filter()
          this.paises = this.paises.filter((p) => p.id != pais.id)

          // Notify the user that the pais is gone
          this.$toasted.show(`${pais.nome} removed...`, {
            position: 'top-center',
            duration: 1000,
            type: 'info'
          })
        })
        .catch((err) => {
          utils.check401(err)
          this.removePais(pais)
        })
    }
  }
}
</script>

<style></style>
