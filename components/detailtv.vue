<template>
  <v-card
    class="my-5 mx-auto"
    :width="$vuetify.display.sm ? '700' : $vuetify.display.mdAndUp ? '900' : ''"
  >
    <div class="mx-5 my-3">
      <div class=" ">
        <h3 class="capitalize my-2">
          tanggal rilis:
          <span class="def">{{ props.detail.release_date }}</span>
        </h3>
        <!-- <h3 class="capitalize my-2">
          jumlah episode:
          <span class="def">{{ props.detail.eps_links?.length }}</span>
        </h3> -->
        <h3 class="capitalize my-2">
          genre: <span class="def">{{ props.detail.genre }}</span>
        </h3>
        <h3 class="capitalize my-2">
          sutradara: <span class="def">{{ props.detail.director }}</span>
        </h3>
      </div>
    </div>
  </v-card>
</template>
<script setup lang="ts">
import { TvDetailType, MovieDetailType } from "../types/"
const props = defineProps<{
  detail: TvDetailType | MovieDetailType
}>()
</script>
<style></style>
