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
      <keep-alive>
        <Card :movies="movies" />
      </keep-alive>
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
<script setup lang="ts">
import type { MoviesType, MoviesResType } from "../types/"

const movies = ref<MoviesType[]>([])
const currentPage = ref<number>(1)
const totalPages = ref<number>(0)
const loading = ref<boolean>(true)

const getAllMovies = async () => {
  try {
    const res: MoviesResType = await $fetch(
      `/api/movies?page=${currentPage.value}`
    )

    if (!res) {
      return "Movies not Found"
    }

    movies.value = res.movies
    totalPages.value = res.lastPage

    window.scrollTo({ top: 0, behavior: "smooth" })
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getAllMovies()
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
watch(currentPage, () => {
  getAllMovies()
})
</script>
<style></style>
