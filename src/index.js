import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

const store = createStore(
                           reducer,
                           (localStorage['redux-store']) ?
                             JSON.parse(localStorage['redux-store']) :
                             {}
                         );

store.subscribe(() => {
  localStorage['redux-store'] = JSON.stringify(store.getState())
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
