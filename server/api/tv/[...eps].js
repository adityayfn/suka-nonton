import axios from "axios"
import * as cheerio from "cheerio"
import { siteConfig } from "~/utils/siteConfig"
import { getStreamingLinks } from "../movies/detail/[...movie]"

export default defineEventHandler(async (event) => {
  const baseUrl = siteConfig.scrapUrl
  const newUrl = new URL(event.req.url, baseUrl)

  const query = newUrl.search

  const params = event.context.params.eps

  const url = `${baseUrl}/${params}/${query}`

  const res = await axios.get(url)

  const html = await res.data

  try {
    const $ = cheerio.load(html)

    const eps_links = []

    $(".gmr-listseries a").each((i, e) => {
      if (i != 0) {
        let link = $(e).attr("href")
        eps_links.push({
          title: $(e).text(),
          tvId: link?.replace(baseUrl, ""),
        })
      }
    })

    const streaming_links = $(".gmr-embed-responsive > iframe").attr("src")

    const datas = {
      title: $("h1.entry-title").text(),
      eps: eps_links,
      streaming_links,
    }

    return datas
  } catch (error) {
    return error
  }
})
