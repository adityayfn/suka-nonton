export type GenresType = {
  name: string
  slug: string
}

export type MoviesType = {
  title: string
  movieId: string
  thumbnail_url: string
  rating: string
  trailer: string
}

export type MoviesResType = {
  movies: MoviesType[]
  page: number
  lastPage: number
}

export type MovieDetailType = {
  title: string
  description: string
  rating: string
  genre: string
  duration: string
  release_date: string
  language: string
  director: string
  create_at: string
  tagline: string
  streamingLinks: string[]
  eps_links?: epsLinksType[]
}

export type epsLinksType = {
  title: string
  tvId: string
}

export type TvDetailType = {
  title: string
  trailer: string
  tagline?: string
  description: string
  create_at: string
  director: string
  genre: string
  release_date: string
  eps_links: epsLinksType[]
  number_of_eps: string
  duration?: string
}

export type SeriesType = {
  eps: epsLinksType[]
  streaming_links: string[] | string
  title: string
}
