import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './store/reducers/index';
import Home from './components/Home';

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Home/>
    </Provider>
  );
}

export default App;
