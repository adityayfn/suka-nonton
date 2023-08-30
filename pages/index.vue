<template>
  <v-container>
    <div class="d-flex flex-wrap">
      <v-card v-for="movie in movies" width="200" class="c">
        <v-card-item>
          <v-img :src="movie.thumbnail_url" width="150"></v-img>
          <v-card-title>
            {{ movie.title }}
          </v-card-title>
          <v-card-subtitle>{{ movie.quality }}</v-card-subtitle>
          <v-btn color="success" @click="detail(movie.movieId)">TONTON</v-btn>
        </v-card-item>
      </v-card>
    </div>

    <v-pagination
      v-if="totalPages > 1"
      v-model="currentPage"
      :length="totalPages"
      :total-visible="9"
      prev-icon="mdi-chevron-left"
      next-icon="mdi-chevron-right"
    ></v-pagination>
  </v-container>
</template>
<script setup>
import { useMovies } from "/composables/useMovies"
const { getAll } = useMovies()

const movies = ref([])
const currentPage = ref(1)
const totalPages = ref(0)
const router = useRouter()

const fetchMovies = async () => {
  try {
    const res = await getAll(currentPage.value)
    movies.value = res.data.movies
    totalPages.value = res.data.lastPage
    window.scrollTo({ top: 0, behavior: "smooth" })
    console.log(res.data.movies)
  } catch (error) {
    console.log(error)
  }
}
const detail = (id) => {
  console.log(id)
  router.push(`/detail${id}`)
}

onMounted(async () => {
  await fetchMovies()
})
watch(currentPage, () => {
  fetchMovies()
})
</script>
<style></style>
