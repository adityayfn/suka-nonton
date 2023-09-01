<template>
  <v-card
    width="150"
    max-width="340"
    height="450"
    class="mb-5 mx-auto"
    v-for="movie in movies"
  >
    <div class="relative">
      <v-img :src="movie.thumbnail_url" alt="thumbnail"></v-img>

      <p class="absolute-quality">{{ movie.quality }}</p>
      <p class="absolute-duration" v-if="movie.duration != ''">
        {{ movie.duration }}
      </p>
    </div>
    <v-card-item class="">
      <div class="d-flex flex-column item relative">
        <h5 class="text-body-2">{{ movie.title }}</h5>
        <Genre :genre="movie.genre" />
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
        :model-value="movie.rating * 10"
        :color="rating(movie.rating * 10)"
        :size="40"
        :width="3"
        class="rating"
        >{{ formatVoteAverage(movie.rating) }}</v-progress-circular
      >
    </v-card-text>
  </v-card>
</template>
<script setup>
const props = defineProps(["movies"])
const colors = ref("")

const router = useRouter()

const detail = (id) => {
  router.push(`/detail${id}`)
}

const formatVoteAverage = (voteAverage) => {
  const percentage = Math.round(voteAverage * 10)
  return percentage + "%"
}
const rating = (percent) => {
  if (percent >= 70) return (colors.value = "green")
  else if (percent < 40) return (colors.value = "red")
  else return (colors.value = "yellow")
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
