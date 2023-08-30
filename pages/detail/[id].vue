<template>
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
          <div v-for="(link, index) in detail.streaming_links">
            <v-btn
              @click="changeStremLink(link)"
              color="#ff0000"
              class="mr-1 my-1"
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
        <div class="mx-5 my-3">
          <h2 class="capitalize my-2">
            {{ detail.title }}
          </h2>
          <h4 class="capitalize def my-2">
            {{ detail.description }}
          </h4>
        </div>
      </v-card>

      <v-card
        class="my-5 mx-auto"
        :width="
          $vuetify.display.sm ? '700' : $vuetify.display.mdAndUp ? '900' : ''
        "
      >
        <div class="mx-5 my-3">
          <div class=" ">
            <h3 class="capitalize my-2">
              tanggal rilis: <span class="def">{{ detail.realease }}</span>
            </h3>
            <h3 class="capitalize my-2">
              tagline: <span class="def">{{ detail.tagline }}</span>
            </h3>
            <h3 class="capitalize my-2">
              genre: <span class="def">{{ detail.genre }}</span>
            </h3>
            <h3 class="capitalize my-2">
              durasi: <span class="def">{{ detail.duration }}</span>
            </h3>
            <h3 class="capitalize">
              pemain: <span class="def">{{ detail.artist }}</span>
            </h3>
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
          <div class="mx-5 my-3" v-for="download in downloadLinks">
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
import { useMovies } from "/composables/useMovies"
const { getDetail, loading } = useMovies()

const route = useRoute()
const id = ref(route.params.id)
const detail = ref([])
const streamingLinkActive = ref([])
const downloadLinks = ref([])

const fetchDetail = async () => {
  try {
    const res = await getDetail(id.value)
    detail.value = res.data
    streamingLinkActive.value = res.data.streaming_links[1]
    downloadLinks.value = res.data.download_links
    console.log(detail.value)
  } catch (error) {
    console.log(error)
  }
}
const changeStremLink = (link) => {
  streamingLinkActive.value = link
}

onMounted(async () => {
  await fetchDetail()
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
