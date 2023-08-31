<template>
  <v-card
    class="my-5 mx-auto"
    :width="$vuetify.display.sm ? '700' : $vuetify.display.mdAndUp ? '900' : ''"
  >
    <div class="mx-5 my-3">
      <div class=" ">
        <h3 class="capitalize my-2">
          tanggal rilis: <span class="def">{{ props.detail.realease }}</span>
        </h3>
        <h3 class="capitalize my-2">
          tagline:
          <span class="def">{{
            props.detail.tagline != ""
              ? props.detail.tagline
              : "Tidak Ada Tagline"
          }}</span>
        </h3>
        <h3 class="capitalize my-2">
          genre: <span class="def">{{ props.detail.genre }}</span>
        </h3>
        <h3 class="capitalize my-2">
          durasi: <span class="def">{{ props.detail.duration }}</span>
        </h3>
        <h3 class="capitalize">
          pemain: <span class="def">{{ props.detail.artist }}</span>
        </h3>
      </div>
    </div>
  </v-card>

  <v-card
    class="my-5 mx-auto"
    :width="$vuetify.display.sm ? '700' : $vuetify.display.mdAndUp ? '900' : ''"
  >
    <h2 class="mx-5 mt-2">Download Link</h2>
    <div class="d-flex flex-wrap">
      <div class="mx-5 my-3" v-for="download in props.download">
        <v-btn :href="download.link" color="#ff0000">{{ download.text }}</v-btn>
      </div>
    </div>
  </v-card>
</template>
<script setup>
const props = defineProps(["detail", "download"])
</script>
<style></style>
