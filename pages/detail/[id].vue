<template>
  <div class="mt-10">
    <v-card>
      <div v-for="(server, index) in detail.streaming_links">
        <iframe
          :src="server"
          frameborder="0"
          allowfullscreen
          referrerpolicy="same-origin"
          class="frame"
        ></iframe>

        <v-btn>server{{ index + 1 }}</v-btn>
      </div>
    </v-card>
    <v-card>
      <div>
        <div class=" ">
          <h3 class="capitalize my-2">
            judul: <span class="def">{{ detail.title }}</span>
          </h3>
          <h3 class="capitalize my-2">
            deskripsi: <span class="def">{{ detail.description }}</span>
          </h3>
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
  </div>
</template>
<script setup>
import { useMovies } from "/composables/useMovies"
const { getDetail } = useMovies()

const route = useRoute()
const id = ref(route.params.id)
const detail = ref([])

const fetchDetail = async () => {
  try {
    const res = await getDetail(id.value)
    detail.value = res.data
    console.log(detail.value)
  } catch (error) {
    console.log(error)
  }
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
