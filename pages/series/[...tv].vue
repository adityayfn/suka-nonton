<template>
  <Head>
    <Title>{{ series.title }}</Title>
    <Meta name="description" content="Series terbaik" />
  </Head>
  <v-container>
    <div v-if="loading">
      <Loading />
    </div>
    <div v-else>
      <v-card
        class="my-5 mx-auto"
        :width="
          $vuetify.display.sm ? '700' : $vuetify.display.mdAndUp ? '900' : ''
        "
      >
        <h1 class="mx-5 my-3">{{ series.title }}</h1>
        <div class="mt-6 d-flex justify-center">
          <iframe
            :src="streamingLinkActive"
            frameborder="1"
            allowfullscreen
            referrerpolicy="same-origin"
            class="frame"
            :width="
              $vuetify.display.sm
                ? '600'
                : $vuetify.display.mdAndUp
                ? '800'
                : '300'
            "
            :height="
              $vuetify.display.sm
                ? '300'
                : $vuetify.display.mdAndUp
                ? '400'
                : '200'
            "
          ></iframe>
        </div>
        <div class="d-flex flex-wrap mx-5 my-6">
          <div v-for="(link, index) in series.streaming_links">
            <v-btn
              color="#ff0000"
              class="mr-1 my-1"
              @click="changeStreamLink(link)"
              >server{{ index + 1 }}</v-btn
            >
          </div>
        </div>
      </v-card>
      <v-card
        class="my-5 mx-auto"
        :width="
          $vuetify.display.sm ? '700' : $vuetify.display.mdAndUp ? '900' : ''
        "
      >
        <div class="d-flex flex-wrap align-center mx-3 my-2">
          <h3 class="mx-3 py-3">Pilih Episode</h3>

          <div v-for="(link, index) in series.eps_links">
            <v-btn
              @click="chooseEps(link.tvId)"
              color="#ff0000"
              class="mr-1 my-1"
              >{{ link.title }}</v-btn
            >
          </div>
        </div>
      </v-card>
      <v-card
        class="my-5 mx-auto"
        :width="
          $vuetify.display.sm ? '700' : $vuetify.display.mdAndUp ? '900' : ''
        "
      >
        <h2 class="mx-5 mt-2">Download Link</h2>
        <div class="d-flex flex-wrap">
          <div class="mx-5 my-3" v-for="download in downloadLink">
            <v-btn :href="download.link" color="#ff0000">{{
              download.text
            }}</v-btn>
          </div>
        </div>
      </v-card>
    </div>
  </v-container>
</template>
<script setup>
const { loading, getSeriesEps } = useMovies()
const route = useRoute()
const router = useRouter()
const id = route.params.tv
const series = ref([])
const streamingLinkActive = ref([])
const downloadLink = ref([])

const fetchSeries = async () => {
  try {
    const res = await getSeriesEps(id)
    series.value = res.data
    streamingLinkActive.value = res.data.streaming_links[1]
    downloadLink.value = res.data.download_links
  } catch (error) {
    console.log(error)
  }
}

const changeStreamLink = (link) => {
  streamingLinkActive.value = link
}
const chooseEps = (eps) => {
  router.push(`/series${eps}`)
}

onMounted(async () => {
  await fetchSeries()
})
</script>
<style></style>
