import axios from "axios"
import * as cheerio from "cheerio"
import { siteConfig } from "~/utils/siteConfig"

export default defineEventHandler(async (event) => {
  const baseUrl = siteConfig.scrapUrl

  const newUrl = new URL(event.req.url, baseUrl)

  const page = Number(newUrl.searchParams.get("page")) || 1
  const category = newUrl.searchParams.get("category")
  const query = newUrl.searchParams.get("q") ?? ""

  let scrapUrl = baseUrl

  if (page > 1 || query) {
    scrapUrl = `${baseUrl}/page/${page}/?s=${query}&search=advanced`
  }

  if (category) {
    scrapUrl = `${baseUrl}/category/${category}/page${page}`
  }

  const movies = []

  try {
    const res = await axios.get(scrapUrl)
    const $ = cheerio.load(res.data)

    const movieEl = $("article.item-infinite")

    let lastPage = 0
    const pagination = $(".inf-pagination")

    pagination.each((index, element) => {
      $(element).find("a.next.page-numbers").remove()

      lastPage = Number($(element).find("a.page-numbers").last().text())
    })

    movieEl.each((index, element) => {
      movies.push({
        title: $(element).find(".entry-title > a").text(),
        movieId: $(element)
          .find(".entry-title > a")
          .attr("href")
          .replace(baseUrl, ""),
        thumbnail_url: $(element).find(".attachment-medium").attr("src"),
        rating: $(element).find(".gmr-rating-item").text().trim(),
        trailer: $(element)
          .find(".gmr-popup-button > a.gmr-trailer-popup")
          .attr("href"),
      })
    })
    return { movies, page, lastPage }
  } catch (error) {
    return error
  }
})
