import axios from 'axios';
import { WIKI_API } from '../../endpoints/endpoints'

type GeosearchParams = {
  gscoord: string,
  gsradius?: number,
  gslimit?: number,
  prop?: string,
}

const defaultParams = {
  action: 'query',
  list: 'geosearch',
  format: 'json',
  origin: '*',
  gsradius: 10000,
  gslimit: 120
}

export const geosearch = (params: GeosearchParams) => {
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