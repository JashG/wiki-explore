import { combineReducers } from 'redux'
import { FETCH_ARTICLES, SET_ARTICLES, SET_COORDINATES, SET_ARTICLE_COORDINATES } from '../types';
import { Article, Coordinates } from '../../constants/types';

const initialStateArticle = {
  fetchingArticles: false,
  articles: [] as Article[] | undefined,
}

const initialStateCoordinates = {
  coordinates: {lat: 0, lng: 0} as Coordinates,
}

const initialStateArticleCoordinates = {
  articleCoordinates: {lat: 0, lng: 0} as Coordinates,
}

function articleReducer(state = initialStateArticle, action: { type: string; payload?: Article[]; }) {
  switch(action.type) {
    case FETCH_ARTICLES:
      return {
        ...state,
        fetchingArticles: true,
        articles: []
      }

    case SET_ARTICLES:
      return {
        ...state,
        fetchingArticles: false,
        articles: action.payload
      }
  }
  
  return state;
}

function coordinatesReducer(state = initialStateCoordinates, action: { type: string; payload: Coordinates}) {
  switch(action.type) {
    case SET_COORDINATES:
      return {
        ...state,
        coordinates: action.payload
      }
  }

  return state;
}

function articleCoordinatesReducer(state = initialStateArticleCoordinates, action: { type: string; payload: Coordinates}) {
  switch(action.type) {
    case SET_ARTICLE_COORDINATES:
      return {
        ...state,
        coordinates: action.payload
      }
  }

  return state;
}

export const rootReducer = combineReducers({
  articles: articleReducer,
  coordinates: coordinatesReducer,
  articleCoordinates: articleCoordinatesReducer,
});