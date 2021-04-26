import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import store from './store';
import App from './components/App';
import { HeaderFont, ArticleFont } from './fonts/fonts';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <HeaderFont />
      <ArticleFont />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
