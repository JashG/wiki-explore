import axios from 'axios';
import { WIKI_API } from '../../endpoints/endpoints'

type GeosearchParams = {
  gscoord: String,
  prop?: String,
}

const defaultParams = {
  action: 'query',
  list: 'geosearch',
  format: 'json',
  origin: '*'
}

export const geosearch = (params: GeosearchParams) => {
  console.log('called')
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