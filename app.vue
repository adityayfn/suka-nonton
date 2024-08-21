<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
useHead({
  title: "Suka Nonton : Nonton film tanpa iklan",
  description: "nonton film tanpa iklan",
  script: [
    {
      async: true,
      src: "https://analytics.umami.is/script.js",
      "data-website-id": "c6c6a847-d049-408c-8040-1b6fc083fdaf",
    },
  ],
})
// const drawer = ref(false)

// const items = ref([
//   {
//     title: "Home",
//     icon: "mdi-home",
//     route: "/",
//   },
//   {
//     title: "Category",
//     icon: "mdi-movie",
//     route: "/category",
//   },

//   {
//     title: "Explore",
//     icon: "mdi-magnify",
//     route: "/explore",
//   },
// ])
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
