import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';

import { HeaderFont, ArticleFont } from './fonts/fonts';

ReactDOM.render(
  <Provider store={store}>
    <HeaderFont />
    <ArticleFont />
    <App />
  </Provider>,
  document.getElementById('root')
);
