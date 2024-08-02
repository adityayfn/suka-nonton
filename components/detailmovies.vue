<template>
  <v-card
    class="my-5 mx-auto"
    :width="$vuetify.display.sm ? '700' : $vuetify.display.mdAndUp ? '900' : ''"
  >
    <div class="mx-5 my-3">
      <div class=" ">
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
      </div>
    </div>
  </v-card>
</template>
<script setup>
const props = defineProps(["detail", "download"])
</script>
<style></style>
