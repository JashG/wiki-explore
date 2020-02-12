export type Article = {
  id: number,
  title: string,
  img: string,
  link: string,
  lat: number,
  lng: number,
  distance: number,
}

export type ArticleFromResponse = {
  pageid: number,
  ns: number,
  title: string,
  lat: number,
  lon: number,
  dist: number,
  primary: string
}

export type Coordinates = {
  lat: number,
  lng: number
}