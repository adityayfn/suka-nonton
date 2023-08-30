import { defineStore } from "pinia"

// import siteConfig from "~/utils/siteConfig"

export const useMyMovies = defineStore("myMovies", {
  state: () => ({
    all: [],
    movies: [],
    tv: [],
    currentPage: 1,
    totalPage: null,
  }),
})
