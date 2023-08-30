<template>
  <v-container>
    <v-card class="d-flex">
      <h2>
        <v-icon color="red" class="ml-1 mt-2" icon="mdi-home"></v-icon>
      </h2>
      <h1 class="ml-2">Home</h1>
    </v-card>

    <div v-if="loading">
      <Loading />
    </div>
    <div class="d-flex flex-wrap mt-5" v-else>
      <Card :movies="movies" />
    </div>

    <v-pagination
      v-if="totalPages > 1"
      v-model="currentPage"
      :length="totalPages"
      :total-visible="$vuetify.display.xs ? 4 : $vuetify.display.sm ? 8 : 12"
      prev-icon="mdi-chevron-left"
      next-icon="mdi-chevron-right"
    ></v-pagination>
  </v-container>
</template>
<script setup>
const { loading, getAll } = useMovies()

const movies = ref([])
const currentPage = ref(1)
const totalPages = ref(0)

const fetchMovies = async () => {
  try {
    const res = await getAll(currentPage.value)
    movies.value = res.data.movies
    totalPages.value = res.data.lastPage
    window.scrollTo({ top: 0, behavior: "smooth" })
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchMovies()
})
watch(currentPage, () => {
  fetchMovies()
})
</script>
<style></style>
