<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-5xl font-bold">Paises</h1>
      <div v-if="$store.getters.isAdmin">
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
    </div>
    <div class="flex flex-wrap md:flex-row">
      <div v-if="editing" class="w-full md:w-1/3 pb-6">
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
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
                  id="username"
                  type="text"
                  placeholder="Nome"
                  v-model="newPais.nome"
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
                />
              </div>
            </div>
          </div>
          <div class="px-6 pt-4 pb-2">
            <button
              :class="
                `bg-teal-600 ${
                  submitCheck ? '' : 'cursor-not-allowed'
                } w-full hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`
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
        class="w-full md:w-1/3 md:pr-3 lg:pr-0 pb-6"
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
            alt="Sunset in the mountains"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-black">
              {{ pais.nome }} ({{ pais.sigla }})
            </div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              facilis omnis sed! Molestiae
              {{ submitCheck }}
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span
              class="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
              >Language: {{ pais.gentilico }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    paises: [],
    editing: false,
    newPais: { id: 0, nome: '', sigla: '', gentilico: '' }
  }),

  computed: {
    submitCheck() {
      return (
        this.newPais.nome != '' &&
        this.newPais.sigla != '' &&
        this.newPais.gentilico != ''
      )
    }
  },

  created() {
    this.fetchPaises()
  },

  methods: {
    async fetchPaises() {
      await this.$http
        .get(this.$baseURL + '/pais/listar', {
          params: {
            token: this.$store.getters.token
          }
        })
        .then((data) => (this.paises = data.data))
        .catch((err) => {
          if (err.response.status == 401) {
            this.$http
              .get(this.$baseURL + '/usuario/renovar-ticket', {
                params: {
                  token: this.$store.getters.token
                }
              })
              .then(() => this.fetchPaises())
          }
        })
    },

    async addPais() {
      if (!this.submitCheck) {
        this.$toasted.show(`Missing Information`, {
          position: 'top-center',
          duration: 2000,
          type: 'error'
        })
        return
      }
      await this.$http
        .post(
          this.$baseURL + `/pais/salvar?token=${this.$store.getters.token}`,
          this.newPais
        )
        .then((data) => {
          this.paises.unshift(data.data)
          this.newPais = { id: 0, nome: '', sigla: '', gentilico: '' }
        })
        .catch((err) => {
          if (err.response.status == 401) {
            this.$http
              .get(this.$baseURL + '/usuario/renovar-ticket', {
                params: {
                  token: this.$store.getters.token
                }
              })
              .then(() => {
                this.$toasted.show(`token renewed`, {
                  position: 'top-center',
                  duration: 1000,
                  type: 'default'
                })
                this.addPais()
              })
          }
        })
    },

    async removePais(pais) {
      if (!confirm(`Are you sure to delete ${pais.nome}? 🙄`)) return
      await this.$http
        .get(
          this.$baseURL +
            `/pais/excluir?id=${pais.id}&token=${this.$store.getters.token}`
        )
        .then((data) => {
          this.paises = this.paises.filter((p) => p.id != pais.id)
          this.$toasted.show(`${pais.nome} removed...`, {
            position: 'top-center',
            duration: 1000,
            type: 'info'
          })
        })
        .catch((err) => {
          if (err.response.status == 401) {
            this.$http
              .get(this.$baseURL + '/usuario/renovar-ticket', {
                params: {
                  token: this.$store.getters.token
                }
              })
              .then(() => this.removePais(pais))
          }
        })
    }
  }
}
</script>

<style></style>
