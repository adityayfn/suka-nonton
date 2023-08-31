import axios from "axios"

export const useMovies = () => {
  const loading = ref(false)
  const getAll = async (page) => {
    try {
      loading.value = true
      const res = await axios.get(
        `https://asyik-nonton.vercel.app/api/movies?q=&page=${page}`
      )
      return res.data
    } catch (error) {
      return error
    } finally {
      loading.value = false
    }
  }
  const getDetail = async (id) => {
    try {
      loading.value = true
      let url = `https://asyik-nonton.vercel.app/api/movies/detail/${id[0]}`
      if (id.length > 2)
        url = `https://asyik-nonton.vercel.app/api/movies/detail/${id[0]}/${id[1]}`
      const res = await axios.get(url)
      return res.data
    } catch (error) {
      return error
    } finally {
      loading.value = false
    }
  }
  const getCategory = async () => {
    try {
      const res = await axios.get(
        `https://asyik-nonton.vercel.app/api/category`
      )

      return res.data
    } catch (error) {
      return error
    }
  }
  const getByCategory = async (page, category) => {
    try {
      loading.value = true
      const res = await axios.get(
        `https://asyik-nonton.vercel.app/api/movies?page=${page}&category=${category}`
      )

      return res.data
    } catch (error) {
      return error
    } finally {
      loading.value = false
    }
  }
  const getBySearch = async (query, page) => {
    try {
      const res = await axios.get(
        `https://asyik-nonton.vercel.app/api/movies?q=${query}&page=${page}`
      )

      return res.data
    } catch (error) {
      return error
    }
  }
  const getSeriesEps = async (eps) => {
    try {
      loading.value = true
      const res = await axios.get(
        `https://asyik-nonton.vercel.app/api/tv/${eps[0]}/${eps[1]}`
      )

      return res.data
    } catch (error) {
      return error
    } finally {
      loading.value = false
    }
  }

  return {
    getAll,
    getDetail,
    getCategory,
    getByCategory,
    getBySearch,
    loading,
    getSeriesEps,
  }
}
