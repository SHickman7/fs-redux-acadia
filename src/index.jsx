import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import App from './components/App/App';
import './index.css';

const bookList = (state = [], action) => {
  // TODO - set book list with data from server
  // DON'T MAKE AXIOS CALLS HERE
  // action looks like: {type: 'BOOKLIST_REFRESH', payload: response.data}
  if (action.type === 'BOOKLIST_REFRESH') {
    return action.payload;
  }

  return state;
}

const reduxStore = createStore(
  combineReducers({
    bookList
  }),
  applyMiddleware(logger)
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
