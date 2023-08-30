// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  runtimeConfig: {
    public: {
      baseUrl: "http://localhost:3000",
    },
  },
  modules: ["@pinia/nuxt"],
})
