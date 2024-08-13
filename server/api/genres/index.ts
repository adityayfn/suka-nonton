import axios from "axios"
import * as cheerio from "cheerio"
import { GenresType } from "~/types"
import { siteConfig } from "~/utils/siteConfig"

export default defineEventHandler(async () => {
  const baseUrl = siteConfig.scrapUrl

  const res = await axios.get(baseUrl)
  const html = await res.data
  try {
    const $ = cheerio.load(html)

    const genres: GenresType[] = []

    $(".sub-menu > .menu-item-object-category > a > span").each((i, e) => {
      genres.push({
        name: $(e).text(),
        slug: $(e).text().toLowerCase().replace(" ", "-"),
      })
    })

    return genres
  } catch (error) {
    return error
  }
})
