import { siteConfig } from "~/utils/siteConfig"
import * as cheerio from "cheerio"
import axios from "axios"
import { removeSeparator } from "~/utils/helper"
import { epsLinksType, MovieDetailType, TvDetailType } from "~/types"

export default defineEventHandler(async (event) => {
  const baseUrl = siteConfig.scrapUrl

  const params = event.context.params?.movie.split("/")

  let url = baseUrl
  console.log(url)

  if (params!.length < 2) {
    url = `${baseUrl}/${params![0]}`
  } else {
    url = `${baseUrl}/${params![0]}/${params![1]}`
  }

  const movieDetail: MovieDetailType[] = []
  const tvDetail: TvDetailType[] = []
  const dataMovie: { [key: string]: string } = {}

  try {
    const res = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: siteConfig.scrapUrl,
      },
      timeout: 20000,
    })

    const $ = cheerio.load(res.data)

    const streamLinks: string[] = []

    const numOfStreamLinks = $("ul.muvipro-player-tabs li a")
      .text()
      .split(" ")
      .at(-1)

    if (numOfStreamLinks) {
      for (let i = 1; i <= parseInt(numOfStreamLinks); i++) {
        streamLinks.push(`${url}/?player=${i}`)
      }
    }

    const streamingLinks = await getStreamingLinks(streamLinks)
    const streamingLinksFiltered = streamingLinks.filter(
      (link): link is string => link !== undefined
    )

    const eps_links_tv: epsLinksType[] = []
    $(".gmr-listseries a").each((i, el) => {
      if (i !== 0) {
        let link = $(el).attr("href")

        eps_links_tv.push({
          title: $(el).text(),
          tvId: link?.replace(siteConfig.scrapUrl, "") ?? "tvId not found",
        })
      }
    })

    $("#main").each((index: number, element: any) => {
      $(element)
        .find(".gmr-moviedata")
        .each((i, ec) => {
          // ec = element child
          const textLine = removeSeparator($(ec).text())[0]
            .toLowerCase()
            .replace(" ", "_")
          const textValue = removeSeparator($(ec).text())[1].toLowerCase()

          dataMovie[textLine] = textValue
        })

      if (params![0] !== "tv") {
        movieDetail.push({
          title: $(element).find("h1.entry-title").text(),
          description: $(element).find("div.entry-content p").text(),
          create_at: dataMovie.posted_on ?? "-",
          tagline: dataMovie.tagline ?? "-",
          rating: dataMovie.rate ?? "-",
          genre: dataMovie.genre ?? "-",
          duration: dataMovie.duration,
          release_date: dataMovie.year ?? "-",
          language: dataMovie.language ?? "-",
          director: dataMovie.by ?? "-",
          streamingLinks: streamingLinksFiltered,
        })
      } else {
        tvDetail.push({
          title: $(element).find("h1.entry-title").text(),
          trailer:
            $(element).find(".gmr-embed-responsive iframe").attr("src") ??
            "trailer not found",
          description: $(element).find("div.entry-content p").text(),
          create_at: dataMovie.posted_on ?? "",
          director: dataMovie.by,
          genre: dataMovie.genre ?? "",
          release_date: dataMovie.release ?? "",
          number_of_eps: dataMovie.number_of_episode,
          eps_links: eps_links_tv,
        })
      }
    })
    const data = params![0] !== "tv" ? movieDetail : tvDetail

    return data
  } catch (error) {
    return error
  }
})

export async function getStreamingLinks(
  streamLinks: string[]
): Promise<(string | undefined)[]> {
  const streamingLinks = []

  for (let i = 0; i < streamLinks.length; i++) {
    const rawRes = await fetch(streamLinks[i])

    const html = await rawRes.text()

    const $ = cheerio.load(html)

    const streamLink = $(".gmr-embed-responsive > iframe").attr("src")

    streamingLinks.push(streamLink)
  }

  return streamingLinks
}
