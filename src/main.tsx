import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { light } from './style/theme';
import store from './redux';
import App from './App';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <ThemeProvider theme={ light }>
      <BrowserRouter>
        <Provider store={ store }>
          <App />
        </Provider>
      </BrowserRouter>

    </ThemeProvider>,
  );
