import axios from "axios"
import * as cheerio from "cheerio"
import { MoviesType } from "~/types"
import { siteConfig } from "~/utils/siteConfig"

export default defineEventHandler(async (event) => {
  const baseUrl = siteConfig.scrapUrl

  const newUrl = new URL(event.req.url ?? "unknown url", baseUrl)

  const page = Number(newUrl.searchParams.get("page")) || 1
  const category = newUrl.searchParams.get("genre")
  const query = newUrl.searchParams.get("q") ?? ""

  let scrapUrl = baseUrl

  if (page > 1 || query) {
    scrapUrl = `${baseUrl}/page/${page}/?s=${query}&search=advanced`
  }

  if (category) {
    const params = new URLSearchParams({
      s: "",
      search: "advanced",
      post_type: "",
      index: "",
      orderby: "",
      genre: category,
      movieyear: "",
      country: "",
      quality: "",
    })
    if (page >= 1) scrapUrl = `${baseUrl}/page/${page}?${params.toString()}`
    else scrapUrl = `${baseUrl}?${params.toString()}`
  }

  const movies: MoviesType[] = []

  try {
    const res = await axios.get(scrapUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
    })

    const $ = cheerio.load(res.data)

    const movieEl = $("article.item-infinite")

    let lastPage = 0
    const pagination = $(".pagination")

    pagination.each((index, element) => {
      $(element).find("a.next.page-numbers").remove()

      lastPage = Number($(element).find("a.page-numbers").last().text())
    })

    movieEl.each((index: number, element: any) => {
      movies.push({
        title: $(element).find(".entry-title > a").text(),
        movieId:
          $(element)
            .find(".entry-title > a")
            .attr("href")
            ?.replace(baseUrl, "") ?? "movieId not found",
        thumbnail_url:
          $(element).find(".attachment-medium").attr("src") ??
          "thumbnail_url doesn't exist",
        rating: $(element).find(".gmr-rating-item").text().trim(),
        trailer:
          $(element)
            .find(".gmr-popup-button > a.gmr-trailer-popup")
            .attr("href") ?? "trailer not found",
      })
    })

    return { movies, page, lastPage }
  } catch (error) {
    return error
  }
})
