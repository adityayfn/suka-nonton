<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar class="py-2 px-8" color="#000">
      <nuxt-link to="/"> home </nuxt-link>
      <!-- <nuxt-link to="/mens" class="link px-3">
        <h3>Movies</h3>
      </nuxt-link>
      <nuxt-link to="/womens" class="link px-3">
        <h3>TV Series</h3>
      </nuxt-link> -->
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main class="" style="">
      <NuxtPage />
    </v-main>
  </v-layout>
</template>
<script setup></script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@200;400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Overpass:wght@100;400;700&display=swap");
* {
  font-family: "Oswald", sans-serif;
}
.c {
  border: 1px solid black;
}
</style>
