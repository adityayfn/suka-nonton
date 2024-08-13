<template>
  <v-card
    width="150"
    max-width="340"
    height="350"
    class="mb-5 mx-auto"
    v-for="movie in props.movies"
  >
    <div class="relative">
      <v-img :src="movie.thumbnail_url" alt="thumbnail"></v-img>
    </div>
    <v-card-item class="">
      <div class="d-flex flex-column item relative">
        <h5 class="text-body-2">{{ movie.title }}</h5>
      </div>
      <div class="d-flex absolute-btn">
        <Modaltrailer :movie="movie" />

        <v-btn color="#ff0000" @click="detail(movie.movieId)" size="small"
          >tonton</v-btn
        >
      </div>
    </v-card-item>
    <v-card-text class="rating-container" v-if="movie.rating != ''">
      <v-progress-circular
        :model-value="parseInt(movie.rating) * 10"
        :color="rating(parseInt(movie.rating) * 10)"
        :size="40"
        :width="3"
        class="rating"
        >{{ formatVoteAverage(parseInt(movie.rating)) }}</v-progress-circular
      >
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { MoviesType } from "../types/"

const props = defineProps<{
  movies: MoviesType[]
}>()

const router = useRouter()

const detail = (id: string) => {
  router.push(`/detail${id}`)
}
</script>
<style>
.rating-container {
  position: absolute;
  top: 0px;
  left: -16px;
}
.rating {
  background-color: black;
  border-radius: 50%;
}
</style>
