import { AnyAction } from 'redux';
import { Wallet } from '../../types';
import {
  UPDATE_CURRENCIES,
  UPDATE_EXPENSES,
  CHANGE_REQUEST,
  REMOVE_EXPENSE,
  CHANGE_TO_EDIT_MODE,
  EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica se uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que está sendo editada
  isFatching: true,
  isEditingMode: false,
};

const walletReducer = (state: Wallet = INITIAL_STATE, actions: AnyAction) => {
  switch (actions.type) {
    case UPDATE_CURRENCIES:
      return {
        ...state,
        currencies: actions.payload,
      };
    case UPDATE_EXPENSES:
      return {
        ...state,
        expenses: [...state.expenses, actions.payload],
      };
    case CHANGE_REQUEST:
      return {
        ...state,
        isFatching: actions.payload,
      };
    case REMOVE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== actions.payload),
      };
    case CHANGE_TO_EDIT_MODE:
      return {
        ...state,
        isEditingMode: actions.payload.isEditMode,
        idToEdit: actions.payload.expenseId,
      };
    case EDIT_EXPENSE:
      return {
        ...state,
        isEditingMode: false,
        idToEdit: 0,
        expenses: state.expenses.map((expense) => {
          if (expense.id === actions.payload.id) {
            return { ...expense, ...actions.payload };
          }
          return { ...expense };
        }),
      };
    default:
      return state;
  }
};

export default walletReducer;
