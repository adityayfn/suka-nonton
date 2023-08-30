<template>
  <v-container>
    <div>
      <v-text-field v-model="query" label="Search Movies"></v-text-field>
      <small v-if="query !== ''"
        >*Tekan tombol reset jika ingin mencari film lain</small
      >
    </div>
    <v-btn type="submit" color="#ff0000" class="mr-2" @click="searchMovies"
      >Search</v-btn
    ><v-btn type="submit" color="warning" @click="reset">Reset</v-btn>

    <div v-if="loading">
      <Loading />
    </div>
    <div v-else-if="query && searchResults.length > 0" class="mt-5">
      <h2>Hasil pencarian '{{ query }}'</h2>
      <div class="d-flex flex-wrap mt-5">
        <Card :movies="searchResults" />
      </div>
      <v-pagination
        v-if="totalPages > 1"
        v-model="currentPage"
        :length="totalPages"
        :total-visible="$vuetify.display.xs ? 4 : $vuetify.display.sm ? 8 : 10"
        prev-icon="mdi-chevron-left"
        next-icon="mdi-chevron-right"
      ></v-pagination>
    </div>
    <div v-else-if="showNoResults">
      <h1>Hasil dari '{{ query }}' tidak ditemukan</h1>
    </div>
  </v-container>
</template>
<script setup>
const { getBySearch } = useMovies()

const query = ref("")
const currentPage = ref(1)
const searchResults = ref([])
const totalPages = ref(null)
const loading = ref(false)
const showNoResults = ref(false)

const searchMovies = async () => {
  try {
    loading.value = true
    const res = await getBySearch(query.value, currentPage.value)
    searchResults.value = res.data.movies
    totalPages.value = res.data.lastPage
    loading.value = false
    window.scrollTo({ top: 0, behavior: "smooth" })
    showNoResults.value = res.data.movies.length === 0 && query.value !== ""
    console.log(showNoResults.value)
  } catch (error) {
    console.log(error)
  }
}
const reset = () => {
  query.value = ""
  searchResults.value = []
  showNoResults.value = false
}
// watch(query, async () => {
//   await searchMovies()
// })
</script>
<style></style>
