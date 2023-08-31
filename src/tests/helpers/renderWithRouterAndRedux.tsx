import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import rootReducer from '../../redux/reducers';
import { ReduxState } from '../../types';
import { light } from '../../style/theme';

function renderWithRouterAndRedux(
  component: JSX.Element,
  route: string = '/',
  state: ReduxState | undefined = undefined,
  store = createStore(rootReducer, state, applyMiddleware(thunk)),
) {
  window.history.pushState({}, 'Test page', route);

  return {
    ...render(
      <BrowserRouter>
        <ThemeProvider theme={ light }>
          <Provider store={ store }>{component}</Provider>

        </ThemeProvider>
      </BrowserRouter>,
    ),
    user: userEvent.setup(),
    store,
  };
}

export default renderWithRouterAndRedux;
