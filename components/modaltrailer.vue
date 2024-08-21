<template>
  <v-dialog transition="dialog-bottom-transition" width="auto">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" color="#ff0000" size="small" class="mr-2">
        <v-icon icon="mdi-movie"></v-icon>
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card height="500">
        <v-toolbar color="#ff0000" :title="props.movie.title"></v-toolbar>

        <div class="">
          <iframe
            :src="props.movie.trailer.replace(`watch?v=`, `embed/`)"
            frameborder="0"
            allowfullscreen
            :class="
              $vuetify.display.xs
                ? 'frame-xs'
                : $vuetify.display.smAndUp
                ? 'frame-smup'
                : ''
            "
          ></iframe>
        </div>

        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="isActive.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import type { MoviesType } from "../types/"
const props = defineProps<{
  movie: MoviesType
}>()
</script>
<style>
.frame-smup {
  width: 700px;
  height: 370px;
}
.frame-xs {
  width: 350px;
  height: 370px;
}
</style>
