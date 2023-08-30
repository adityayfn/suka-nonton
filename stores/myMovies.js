import { defineStore } from "pinia"

// import siteConfig from "~/utils/siteConfig"

export const useMyMovies = defineStore("myMovies", {
  state: () => ({
    baseUrl: "http://localhost:3000",
    scrapUrl: `https://ngefilm21.lat`,
    movies: [],
    page: 1,
    totalPages: null,
  }),
})
