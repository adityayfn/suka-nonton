<template>
  <v-container>
    <div>
      <v-text-field v-model="query" label="Search Movies"></v-text-field>
    </div>
    <v-btn type="submit" color="#ff0000" class="mr-2" @click="searchMovies"
      >Search</v-btn
    >

    <div v-if="loading">
      <Loading />
    </div>
    <div v-else-if="query && searchResults.length > 0" class="mt-5">
      <h2>Hasil pencarian '{{ query }}'</h2>
      <div class="d-flex flex-wrap mt-5">
        <keep-alive>
          <Card :movies="searchResults" />
        </keep-alive>
      </div>
      <v-pagination
        v-if="totalPages! > 1"
        v-model="currentPage"
        :length="totalPages ?? 0"
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
<script setup lang="ts">
import { MoviesType, MoviesResType } from "../types/"

const query = ref<string>("")
const currentPage = ref<number>(1)
const searchResults = ref<MoviesType[]>([])
const totalPages = ref<number | null>(null)
const loading = ref<boolean>(false)
const showNoResults = ref<boolean>(false)

const searchMovies = async () => {
  try {
    const res: MoviesResType = await $fetch(
      `/api/movies?q=${query.value}&page=${currentPage.value}`
    )

    if (!res) {
      return "Movies not found"
    }

    searchResults.value = res.movies
    totalPages.value = res.lastPage
    window.scrollTo({ top: 0, behavior: "smooth" })
  } catch (error) {
    console.log(error)
  }
}

const reset = () => {
  query.value = ""
  searchResults.value = []
  showNoResults.value = false
}

watch(currentPage, () => {
  searchMovies()
})
watch(query, () => {
  if (query.value == "") reset()
})
</script>
<style></style>
