<template>
  <div class="h-screen d-flex flex-column justify-center align-center">
    <div>
      <h1>Loading</h1>
    </div>
    <div class="d-flex">
      <v-progress-circular
        :size="50"
        color="#ff0000"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
