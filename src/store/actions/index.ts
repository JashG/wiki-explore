import { FETCH_ARTICLES, SET_ARTICLES, SET_COORDINATES, SET_ARTICLE_COORDINATES } from '../types';
import { Article, Coordinates } from '../../constants/types';

export function fetchArticles() {
  return {
    type: FETCH_ARTICLES
  }
}

export function setArticles (articles: Article[]) {
  return {
    type: SET_ARTICLES,
    payload: articles
  }
}

export function setCoordinates(coordinates: Coordinates) {
  return {
    type: SET_COORDINATES,
    payload: coordinates
  }
}

export function setArticleCoordinates(coordinates: Coordinates) {
  return {
    type: SET_ARTICLE_COORDINATES,
    payload: coordinates
  }
}