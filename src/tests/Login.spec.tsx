import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import * as getCurrencies from '../services/currenciesApi';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import mockData from './helpers/mockData';

const LOGIN_INVALIDO_1 = 'useremail.com';
const PASSWORD_INVALIDO_1 = '1234';

const LOGIN_VALIDO_1 = 'user@gmail.com';
const PASSWORD_VALIDO_1 = '123456';

beforeEach(() => {
  vi.spyOn(getCurrencies, 'fetchCurrencies').mockResolvedValue(mockData);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Testa Pagina de Login', () => {
  test('Testa se campos de email e senha estão na tela', async () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = await screen.findByPlaceholderText(/Digite seu E-mail/i);
    const passwordInput = await screen.findByPlaceholderText(/Digite sua Senha/i);
    const buttonLogin = await screen.findByRole('button', { name: /Entrar/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
    expect(buttonLogin).toBeDisabled();
  });

  test('Testa se botão e habilitado quando campos são preenchidos corretamente', async () => {
    const { user } = renderWithRouterAndRedux(<App />);

    const emailInput = await screen.findByPlaceholderText(/Digite seu E-mail/i);
    const passwordInput = await screen.findByPlaceholderText(/Digite sua Senha/i);
    const buttonLogin = await screen.findByRole('button', { name: /Entrar/i });

    expect(buttonLogin).toBeDisabled();

    await user.type(emailInput, LOGIN_INVALIDO_1);
    await user.type(passwordInput, PASSWORD_INVALIDO_1);

    expect(buttonLogin).toBeDisabled();

    await user.clear(emailInput);
    await user.clear(passwordInput);

    await user.type(emailInput, LOGIN_VALIDO_1);
    await user.type(passwordInput, PASSWORD_VALIDO_1);

    expect(buttonLogin).toBeEnabled();
  });

  test('Testa se email e salvo no stado global do Redux', async () => {
    const { user, store } = renderWithRouterAndRedux(<App />);

    const emailInput = await screen.findByPlaceholderText(/Digite seu E-mail/i);
    const passwordInput = await screen.findByPlaceholderText(/Digite sua Senha/i);
    const buttonLogin = await screen.findByRole('button', { name: /Entrar/i });

    await user.type(emailInput, LOGIN_VALIDO_1);
    await user.type(passwordInput, PASSWORD_VALIDO_1);

    expect(buttonLogin).toBeEnabled();

    await user.click(buttonLogin);

    const emailGLobalState = store.getState().user.email;
    expect(emailGLobalState).toBe(LOGIN_VALIDO_1);
  });

  test(`Testa se api e chamada 1 vez ao renderizar a rota /carteira, e se as 
    moedas são salvas no estado global`, async () => {
    const currenciesState = [
      'USD', 'CAD', 'GBP', 'ARS',
      'BTC', 'LTC', 'EUR', 'JPY',
      'CHF', 'AUD', 'CNY', 'ILS',
      'ETH', 'XRP', 'DOGE',
    ];
    const { store } = renderWithRouterAndRedux(<App />, '/carteira');
    expect(getCurrencies.fetchCurrencies).toHaveBeenCalled();

    await waitForElementToBeRemoved(screen.getByText('Carregando...'));
    const currenciesGLobalState = store.getState().wallet.currencies;

    expect(currenciesGLobalState).toHaveLength(currenciesState.length);
  });
  test.todo('Testa se Login e efeituado');
});
