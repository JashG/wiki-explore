import { combineReducers } from 'redux'
import { FETCH_ARTICLES, SET_ARTICLES, SET_COORDINATES } from '../types';
import { Article, Coordinates } from '../../constants/types';

const initialState = {
  fetchingArticles: false,
  articles: [] as Article[] | undefined,
  coordinates: {lat: 0, lng: 0} as Coordinates,
}

function articleReducer(state = initialState, action: { type: string; payload?: Article[]; }) {
  switch(action.type) {
    case FETCH_ARTICLES:
      return {
        ...state,
        fetchingArticles: true
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

function coordinatesReducer(state = initialState, action: { type: string; payload: Coordinates}) {
  switch(action.type) {
    case SET_COORDINATES:
      return {
        ...state,
        coordinates: action.payload
      }
  }

  return state;
}

export const rootReducer = combineReducers({
  articleReducer,
  coordinatesReducer
});

export type ReduxState = ReturnType<typeof rootReducer>