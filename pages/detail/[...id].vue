<template>
  <Head>
    <Title>{{ detail.title || "Wait" }}</Title>
    <Meta name="description" content="nonton film gratis" />
  </Head>

  <v-container class="">
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
        <div class="mt-6 d-flex justify-center">
          <iframe
            :src="streamingLinkActive"
            frameborder="0"
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
          <div
            v-for="(link, index) in detail.streaming_links"
            v-if="type === 'movie'"
          >
            <v-btn
              @click="changeStreamLink(link)"
              color="#ff0000"
              class="mr-1 my-1"
              >server{{ index + 1 }}</v-btn
            >
          </div>
          <div v-if="type === 'tv'" class="d-flex flex-wrap align-center">
            <h3 class="mr-3">Pilih Episode</h3>

            <div v-for="(link, index) in detail.eps_links">
              <v-btn
                @click="
                  chooseEps(
                    `${link.tvId.replace(/\/$/, '')}?player=${index + 1}`
                  )
                "
                color="#ff0000"
                class="mr-1 my-1"
                >{{ link.title }}</v-btn
              >
            </div>
          </div>
        </div>
      </v-card>

      <v-card
        class="my-5 mx-auto"
        :width="
          $vuetify.display.sm ? '700' : $vuetify.display.mdAndUp ? '900' : ''
        "
      >
        <div class="mx-5 my-3">
          <h2 class="capitalize my-2">
            {{ detail.title }}
          </h2>
          <h4 class="capitalize def my-2">
            {{ detail.description }}
          </h4>
        </div>
      </v-card>

      <div v-if="type === 'movie'">
        <Detailmovies :detail="detail" />
      </div>
      <div v-if="type === 'tv'">
        <Detailtv :detail="detail" />
      </div>
    </div>
  </v-container>
</template>
<script setup>
const route = useRoute()
const router = useRouter()
const id = ref(route.params.id)
const detail = ref([])
const type = ref("")
const streamingLinkActive = ref([])
const loading = ref(true)

const fetchDetail = async () => {
  if (id.value.length > 2) {
    const datas = await $fetch(
      `/api/movies/detail/${id.value[0]}/${id.value[1]}`
    )

    type.value = "tv"
    detail.value = datas[0]
    streamingLinkActive.value = detail.value.trailer
  } else {
    const datas = await $fetch(`/api/movies/detail/${id.value[0]}`)
    type.value = "movie"
    detail.value = datas[0]
    streamingLinkActive.value = detail.value.streamingLinks[0]
  }
}

const changeStreamLink = (link) => {
  streamingLinkActive.value = link
}
const chooseEps = (eps) => {
  router.push(`/series${eps}`)
}

onMounted(async () => {
  fetchDetail()
  setTimeout(() => {
    loading.value = false
  }, 1200)
})
</script>
<style>
.capitalize {
  text-transform: capitalize;
}
.def {
  font-weight: 400;
}
</style>
