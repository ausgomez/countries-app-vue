<template>
  <div>
    <EditForm :country="currentCountry" v-if="modalToggle" @close="modalToggle = false" @submit="updateCountry" />
    <div class="flex flex-wrap md:flex-row justify-between items-center mb-4">
      <h1 class="text-5xl font-bold">Countries</h1>
      <div class="flex justify-around items-center order-last md:order-none">
        <input
          type="text"
          class="bg-gray-600 rounded-full text-2xl p-1 shadow text-center h-10"
          placeholder="Search for Country"
          v-model="query"
        />
      </div>
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
      <div v-if="editing" class="w-full md:w-1/3 pb-6 flex justify-center">
        <div class="w-full md:mx-3 rounded overflow-hidden shadow-lg bg-gray-200">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-black">
              <div class="mb-2">
                <h1 class="text-center text-2xl">Add Country</h1>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                  Name
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Name"
                  v-model="newCountry.name"
                  v-on:keyup.enter="addCountry"
                />
              </div>
              <div class="mb-2">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="short">
                  Short
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="short"
                  type="text"
                  placeholder="Short"
                  v-model="newCountry.short"
                  v-on:keyup.enter="addCountry"
                />
              </div>
              <div class="mb-2">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="lang">
                  Lang
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lang"
                  type="text"
                  placeholder="Lang"
                  v-model="newCountry.lang"
                  v-on:keyup.enter="addCountry"
                />
              </div>
            </div>
          </div>
          <div class="px-6 pt-4 pb-2">
            <button
              :class="
                `${
                  submitCheck ? 'bg-teal-600 hover:bg-teal-800' : 'bg-yellow-600 hover:bg-yellow-700 cursor-not-allowed'
                } w-full  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`
              "
              type="button"
              @click="addCountry"
            >
              Add Country
            </button>
          </div>
        </div>
      </div>

      <!-- RENDER EACH CARD FOR EACH COUNTRY -->
      <div
        v-for="(country, i) in filteredCountries"
        :key="country.id"
        class="w-full md:w-1/3 md:pr-3 lg:pr-0 pb-6 flex justify-center"
      >
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200 relative">
          <button
            v-if="editing"
            class="bg-red-500 w-sm absolute top-0 right-0 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="removeCountry(country)"
          >
            <i class="bx bxs-trash"></i>
          </button>
          <img class="w-full" :src="`https://picsum.photos/id/${100 + i}/300/100`" :alt="country.name" />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-black">{{ country.name }} ({{ country.short }})</div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione facilis omnis sed! Molestiae
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
              <span>Language: </span>
              <span>{{ country.lang }}</span>
            </span>

            <p
              v-if="editing"
              @click="clickEditCountry(country)"
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
        v-if="filteredCountries.length === 0"
      >
        <div class="text-4xl ">
          No results found
        </div>
      </div>
    </div>

    <div class="w-full bg-gray-800 flex-col h-64 flex items-center justify-center" v-if="loading">
      <div class="text-5xl ">
        <i class="bx bx-radio-circle bx-burst bx-lg"></i>
        <i class="bx bx-radio-circle bx-burst bx-lg"></i>
        <i class="bx bx-radio-circle bx-burst bx-lg"></i>
        <i class="bx bx-radio-circle bx-burst bx-lg"></i>
      </div>
    </div>
  </div>
</template>

<script>
import EditForm from '@/components/Edit'

export default {
  components: {
    EditForm,
  },
  data: () => ({
    countries: [],
    editing: false,
    newCountry: { name: '', short: '', lang: '' },
    modalToggle: false,
    currentCountry: {},
    query: '',
    loading: false,
  }),

  computed: {
    // This will be checking if the informtation from the form is there or not
    submitCheck() {
      return this.newCountry.name != '' && this.newCountry.short != '' && this.newCountry.lang != ''
    },
    filteredCountries() {
      console.log('compuyer countries')
      return this.countries.filter((c) => c.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1)
    },
  },

  created() {
    /* Upon creation, we will fetch the countries from the backend */
    this.fetchCountries()
  },

  methods: {
    async lookupCountries() {
      console.log(this.query)
    },

    clickEditCountry(country) {
      this.currentCountry = { ...country }
      this.modalToggle = true
    },

    async updateCountry(country) {
      this.loading = true
      /* Modifying info in DB */
      this.$appwrite.database
        .updateDocument('5f85101c09c00', country.$id, country, ['*'], ['*'])
        .then(() => {
          const pos = this.countries.findIndex((p) => p.$id === this.currentCountry.$id)
          this.countries[pos] = country
          this.modalToggle = false
          this.currentCountry = {}
          this.$toasted.show('Country Info updated!', {
            position: 'top-center',
            duration: 2000,
            type: 'default',
          })
        })
        .catch((err) => {
          console.error(err)
          this.$toasted.show('Something went wrong', {
            position: 'top-center',
            duration: 2000,
            type: 'error',
          })
        })

      this.loading = false
    },

    async fetchCountries() {
      this.loading = true
      await this.$appwrite.database.listDocuments('5f85101c09c00').then((res) => {
        console.log(res.$permissions.write)
        this.countries = res.documents
      })

      this.loading = false
    },

    /* Adding a new Country to the database */
    async addCountry() {
      // Making sure that the form is not missing any info
      if (!this.submitCheck) {
        this.$toasted.show(`Missing Information`, {
          position: 'top-center',
          duration: 2000,
          type: 'error',
        })
        return
      }

      this.$appwrite.database.createDocument('5f85101c09c00', this.newCountry, ['*'], ['*']).then((res) => {
        this.countries.unshift({
          name: res.name,
          short: res.short,
          lang: res.lang,
        })

        // Notify the user
        this.$toasted.show(`Country ${this.newCountry.name} added!`, {
          position: 'top-center',
          duration: 2000,
          type: 'success',
        })

        // Then clear the newCountry object (clear form)
        this.newCountry = { id: 0, name: '', short: '', lang: '' }
      })
    },

    /* REMOVING A PAIS FROM THE LIST */
    async removeCountry(country) {
      // Ask the user to confirm first
      if (!confirm(`Are you sure to delete ${country.name}? 🙄`)) return

      // If the user confirmed, proceed to call the Action
      await this.$appwrite.database.deleteDocument('5f85101c09c00', country.$id).then(() => {
        // Remove the deleted country from the local array using a simple Array filter()
        this.countries = this.countries.filter((p) => p.$id != country.$id)

        // Notify the user that the country is gone
        this.$toasted.show(`${country.name} removed...`, {
          position: 'top-center',
          duration: 1000,
          type: 'info',
        })
      })
    },
  },
}
</script>

<style></style>
