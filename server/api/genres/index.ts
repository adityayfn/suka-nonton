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

    $(".gmr-filter-search > form > select[name=genre] option").each((i, e) => {
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
