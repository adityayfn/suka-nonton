<template>
  <Head>
    <Title>{{ detail[0]?.title || "Wait" }}</Title>
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
          <div v-if="type === 'tv'" class="d-flex flex-wrap align-center">
            <h3 class="mr-3">Pilih Episode</h3>

            <div v-for="(link, index) in detail[0].eps_links">
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
            {{ detail[0]?.title }}
          </h2>
          <h4 class="capitalize def my-2">
            {{ detail[0]?.description }}
          </h4>
        </div>
      </v-card>

      <div v-if="type === 'movie'">
        <Detailmovies :detail="detail[0]" />
      </div>
      <div v-if="type === 'tv'">
        <Detailtv :detail="detail[0]" />
      </div>
    </div>
  </v-container>
</template>
<script setup lang="ts">
import type { MovieDetailType, TvDetailType } from "../../types/"
const route = useRoute()
const router = useRouter()
const id = ref(route.params.id)
const detail = ref<MovieDetailType[] | TvDetailType[]>([])
const type = ref("")
const streamingLinkActive = ref<string>("")
const loading = ref(true)

const fetchDetail = async () => {
  if (id.value.length > 2) {
    const res: TvDetailType[] = await $fetch(
      `/api/movies/detail/${id.value[0]}/${id.value[1]}`
    )
    if (!res) {
      return "Series not found"
    }

    type.value = "tv"
    detail.value = [res[0]]
    streamingLinkActive.value = detail.value[0].trailer || ""
  } else {
    const res: MovieDetailType[] = await $fetch(
      `/api/movies/detail/${id.value[0]}`
    )

    if (!res) {
      return "Movies not found"
    }

    type.value = "movie"
    detail.value = [res[0]]
    streamingLinkActive.value = detail.value[0].streamingLinks[0] || ""
  }
}

const chooseEps = (eps: string) => {
  router.push(`/series${eps}`)
}

onMounted(async () => {
  fetchDetail()
  setTimeout(() => {
    loading.value = false
  }, 1500)
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
