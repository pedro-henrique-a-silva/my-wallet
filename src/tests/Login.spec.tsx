import { screen, waitForElementToBeRemoved } from '@testing-library/react';
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

  test(`Testa se Formulario de adiconar despesas, 
  e se botão de exluir remove do estado global`, async () => {
    const { user, store } = renderWithRouterAndRedux(<App />, '/carteira');

    const firstExpense = {
      id: 0,
      value: '11',
      currency: 'USD',
      method: 'Cartão de crédito',
      tag: 'Lazer',
      description: 'Onze dólares',
      exchangeRates: mockData,
    };
    await waitForElementToBeRemoved(screen.getByText('Carregando...'));

    const valueInput = await screen.findByTestId(/value-input/i);
    const currencyInput = await screen.findByTestId(/currency-input/i);
    const methodInput = await screen.findByTestId(/method-input/i);
    const tagInput = await screen.findByTestId(/tag-input/i);
    const descriptionInput = await screen.findByTestId(/description-input/i);

    const button = screen.getByRole('button', { name: /Adicionar Despesa/i });
    await user.type(valueInput, firstExpense.value);
    await user.selectOptions(currencyInput, firstExpense.currency);
    await user.selectOptions(methodInput, firstExpense.method);
    await user.selectOptions(tagInput, firstExpense.tag);
    await user.type(descriptionInput, firstExpense.description);
    await user.click(button);

    const secondExpense = {
      id: 1,
      value: '20',
      currency: 'EUR',
      method: 'Cartão de débito',
      tag: 'Trabalho',
      description: 'Vinte euros',
      exchangeRates: mockData,
    };
    await user.type(valueInput, secondExpense.value);
    await user.selectOptions(currencyInput, secondExpense.currency);
    await user.selectOptions(methodInput, secondExpense.method);
    await user.selectOptions(tagInput, secondExpense.tag);
    await user.type(descriptionInput, secondExpense.description);

    await user.click(button);

    const expensesGLobalState = store.getState().wallet.expenses;
    expect(expensesGLobalState).toEqual([firstExpense, secondExpense]);

    const buttonDeleteExpense = await screen.findAllByTestId(/delete-btn/i);
    await user.click(buttonDeleteExpense[0]);

    const expensesRemovedExpense = store.getState().wallet.expenses;
    expect(expensesRemovedExpense).toHaveLength(1);

    const buttonEditExpense = await screen.findAllByTestId(/edit-btn/i);
    await user.click(buttonEditExpense[0]);

    expect(screen.getByRole('button', { name: /Editar despesa/i })).toBeInTheDocument();
  });
});
