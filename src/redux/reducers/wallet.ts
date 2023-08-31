import { AnyAction } from 'redux';
import { Wallet } from '../../types';
import {
  UPDATE_CURRENCIES,
  UPDATE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica se uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que está sendo editada
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
    default:
      return state;
  }
};

export default walletReducer;
