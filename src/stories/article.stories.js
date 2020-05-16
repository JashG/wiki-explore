import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import { rootReducer } from '../store/reducers/index';
import ArticleComponent from '../components/Article';

const store = createStore(
  rootReducer,
  (window).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window).__REDUX_DEVTOOLS_EXTENSION__()
);

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
  <Provider store={store}>
    <ArticleComponent article={articleProps} />
  </Provider>
)