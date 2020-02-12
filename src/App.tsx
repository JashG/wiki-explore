import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home';
import { rootReducer } from './store/reducers/index';
import './App.css';

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__());

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Home/>
      </div>
    </Provider>
  );
}

export default App;
