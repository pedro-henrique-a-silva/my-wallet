// Coloque aqui suas actions
import { Dispatch, Expenses, ExpensesWithRate } from '../../types';
import { fetchCurrencies } from '../../services/currenciesApi';

export const USER_LOGIN = 'USER_LOGIN';
export const UPDATE_CURRENCIES = 'UPDATE_CURRENCIES';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const CHANGE_REQUEST = 'CHANGE_REQUEST';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const CHANGE_TO_EDIT_MODE = 'CHANGE_TO_EDIT_MODE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const loginAction = (email: string) => ({
  type: USER_LOGIN,
  payload: email,
});

export const currenciesAction = (currencies: string[]) => ({
  type: UPDATE_CURRENCIES,
  payload: currencies,
});

export const updateExpensesAction = (expense: ExpensesWithRate) => ({
  type: UPDATE_EXPENSES,
  payload: expense,
});

export const changeRequestAction = (payload: boolean) => ({
  type: CHANGE_REQUEST,
  payload,
});

export const removeExpenseAction = (expenseId: number) => ({
  type: REMOVE_EXPENSE,
  payload: expenseId,
});

export const editExpenseAction = (expense: Expenses) => ({
  type: EDIT_EXPENSE,
  payload: expense,
});

export const changeToEditingModeAction = (
  editingMode: { isEditMode: boolean, expenseId: number },
) => ({
  type: CHANGE_TO_EDIT_MODE,
  payload: editingMode,
});

// action thunk
export const getCurrenciesAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      const currencies = await fetchCurrencies();
      const filteredCurrencies = Object.keys(currencies)
        .filter((currencie) => currencie !== 'USDT');

      dispatch(currenciesAction(filteredCurrencies));
      dispatch(changeRequestAction(false));
    } catch (error) {
      console.log('erro');
    }
  };
};

export const addNewExpenseAction = (formData: Expenses) => {
  return async (dispatch: Dispatch) => {
    try {
      const currencies = await fetchCurrencies();
      console.log({ ...formData, currencies });
      dispatch(updateExpensesAction({ ...formData, exchangeRates: currencies }));
    } catch (error) {
      console.log('deu ruim');
    }
  };
};
