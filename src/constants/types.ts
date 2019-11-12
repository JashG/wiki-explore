export type Article = {
  id: Number,
  title: String,
  img: String,
  link: String,
  lat: Number,
  lng: Number,
  distance: Number,
}

export type ArticleFromResponse = {
  pageid: Number,
  ns: Number,
  title: String,
  lat: Number,
  lng: Number,
  dist: Number,
  primary: String
}

export type Coordinates = {
  lat: Number,
  lng: Number
}