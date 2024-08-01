<template>
  <Head>
    <Title>{{ series.title || "Wait" }}</Title>
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
        <div class="my-8 d-flex justify-center">
          <iframe
            :src="series.streaming_links"
            frameborder="1"
            allowfullscreen
            referrerpolicy="no-referrer"
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
      </v-card>
      <v-card
        class="my-5 mx-auto"
        :width="
          $vuetify.display.sm ? '700' : $vuetify.display.mdAndUp ? '900' : ''
        "
      >
        <div class="d-flex flex-wrap align-center mx-3 my-2">
          <h3 class="mx-3 py-3">Pilih Episode</h3>

          <div v-for="(link, index) in series.eps">
            <v-btn
              @click="
                chooseEps(`${link.tvId.replace(/\/$/, '')}?player=${index + 1}`)
              "
              color="#ff0000"
              class="mr-1 my-1"
              >{{ link.title }}</v-btn
            >
          </div>
        </div>
      </v-card>
    </div>
  </v-container>
</template>
<script setup>
const route = useRoute()
const router = useRouter()
const series = ref([])

const chooseEps = (eps) => {
  router.push(`/series${eps}`)
}

const fetchSeries = async () => {
  const params0 = route.params.tv[0]
  const params1 = route.params.tv[1]
  const query = route.query.player

  try {
    const datas = await $fetch(`/api/tv/${params0}/${params1}?player=${query}`)

    series.value = datas
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchSeries()
})
</script>
<style></style>
