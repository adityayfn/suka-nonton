<template>
  <Head>
    <Title>Suka Nonton : Nonton film tanpa iklan</Title>
    <Meta name="description" content="nonton film tanpa iklan" />
  </Head>

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

    <v-main class="" style="">
      <NuxtPage :movies="movies" />
    </v-main>
  </v-layout>
</template>
<script setup>
const drawer = ref(false)

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
<style>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@200;400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Overpass:wght@100;400;700&display=swap");
* {
  font-family: "Oswald", sans-serif;
}
.c {
  border: 1px solid #fff;
}
.link {
  text-decoration: none;
  color: #ff0000;
}
.bg {
  background-color: #b6eada;
}
.item {
  height: 180px;
}
.relative {
  position: relative;
}
.absolute-btn {
  position: absolute;
  bottom: 10px;
}
.absolute-quality {
  position: absolute;
  bottom: 0px;
  background-color: #fff;
  color: #000;
  padding: 2px;
  font-size: 0.8rem;
}
.absolute-duration {
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: #000;
  color: #fff;
  padding: 2px;
  font-size: 0.8rem;
  opacity: 0.5;
}
.absolute-rating {
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: #000;
  color: #fff;
  padding: 2px;
  font-size: 0.8rem;
}
</style>
