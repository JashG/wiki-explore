import React from 'react';
import { Article } from '../components/Article';

export default { title: 'Article' }

const articleProps = {
  id: 1,
  title: 'Title',
  img: '',
  link: '',
  lat: 100.111,
  lng: 50.111,
  distance: 25.111,
} 

export const article = () => (
  <Article article={articleProps}/>
)