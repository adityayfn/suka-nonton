<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar class="" color="">
      <v-card
        class="bar mx-2"
        v-show="$vuetify.display.smAndDown"
        elevation="0"
      >
        <v-app-bar-nav-icon
          variant="text"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </v-card>
      <nuxt-link to="/" class="link mx-3">
        <h1>SUKA NONTON</h1>
      </nuxt-link>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" location="left" temporary>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.route"
        link
      >
        <v-list-item-content class="d-flex my-3">
          <v-list-item-title class="d-flex">
            <h2>
              <v-icon>{{ item.icon }}</v-icon>
            </h2>
            <h2 class="mt-1 ml-4">
              {{ item.title }}
            </h2>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-navigation-drawer location="left">
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.route"
        link
      >
        <v-list-item-content class="d-flex my-3">
          <v-list-item-title class="d-flex">
            <h2>
              <v-icon>{{ item.icon }}</v-icon>
            </h2>
            <h2 class="mt-1 ml-4">
              {{ item.title }}
            </h2>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
const drawer = ref<boolean>(false)

const items = ref([
  {
    title: "Home",
    icon: "mdi-home",
    route: "/",
  },
  {
    title: "Category",
    icon: "mdi-movie",
    route: "/category",
  },

  {
    title: "Explore",
    icon: "mdi-magnify",
    route: "/explore",
  },
])
</script>
<style></style>
