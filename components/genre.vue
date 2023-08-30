<template>
  <div class="d-flex flex-wrap">
    <div v-for="genre in displayedGenre">
      <v-chip size="small">{{ genre }} </v-chip>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(["genre"])
const maxGenre = 2
const displayedGenre = props.genre.slice(0, 3)
</script>
<style></style>
