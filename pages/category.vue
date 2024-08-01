<template>
  <v-container>
    <v-card class="d-flex">
      <h2>
        <v-icon color="red" class="ml-1 mt-2" icon="mdi-view-list"></v-icon>
      </h2>
      <h1 class="ml-2">Category</h1>
    </v-card>

    <div class="d-flex flex-wrap mt-5">
      <div v-for="genre in genres">
        <v-chip
          class="ma-2"
          :color="activeGenre === genre.slug ? 'red' : 'white'"
          text-color="white"
          @click="getDataByGenre(genre.slug)"
        >
          {{ genre.name }}
        </v-chip>
      </div>
    </div>

    <div>
      <div v-if="loading">
        <Loading />
      </div>
      <div class="d-flex flex-wrap mt-5" v-else>
        <keep-alive>
          <Card :movies="movies" />
        </keep-alive>
      </div>
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
const genres = ref([])
const movies = ref([])
const currentPage = ref(1)
const totalPages = ref(0)
const activeGenre = ref("action")
const loading = ref(true)

const getCategory = async () => {
  try {
    const category = await $fetch("/api/genres")
    genres.value = category
  } catch (error) {
    console.log(error)
  }
}

const getDataByGenre = async (genre) => {
  activeGenre.value = genre
  try {
    const datas = await $fetch(
      `/api/movies?category=${genre}&page=${currentPage.value}`
    )

    movies.value = datas.movies
    totalPages.value = datas.lastPage

    window.scrollTo({ top: 0, behavior: "smooth" })
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getCategory()
  getDataByGenre("action")
  setTimeout(() => {
    loading.value = false
  }, 500)
})

watch(currentPage, () => {
  getDataByGenre(activeGenre.value)
})

watch(activeGenre, () => {
  currentPage.value = 1
})
</script>
<style></style>
