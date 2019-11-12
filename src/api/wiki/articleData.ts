import axios from 'axios';
import { WIKI_API } from '../../endpoints/endpoints'

type ArticleDataParams = {
  pageids: String,
  prop?: String,
  inprop?: String,
  piprop?: String,
}

const defaultParams = {
  action: 'query',
  prop: 'info',
  format: 'json',
  origin: '*'
}

export const articleData = (params: ArticleDataParams) => {
  const allParams = {
    ...defaultParams,
    ...params
  }

  return axios.get(WIKI_API, {
    params: {
      ...allParams
    }
  });
}