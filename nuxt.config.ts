export default defineNuxtConfig({
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  nitro: {
    prerender: {
      routes: ["/category", "/explore"],
    },
  },

  runtimeConfig: {
    public: {
      baseUrl: "http://localhost:3000",
    },
  },
})
