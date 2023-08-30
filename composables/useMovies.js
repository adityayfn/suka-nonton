import axios from "axios"
import * as cheerio from "cheerio"

export const useMovies = () => {
  const getAll = async (page) => {
    try {
      const res = await axios.get(
        `https://asyik-nonton.vercel.app/api/movies?q=&page=${page}`
      )
      return res.data
    } catch (error) {
      return error
    }
  }
  const getDetail = async (id) => {
    try {
      const res = await axios.get(
        `https://asyik-nonton.vercel.app/api/movies/detail/${id}`
      )

      return res.data
    } catch (error) {
      return error
    }
  }
  return {
    getAll,
    getDetail,
  }
}
