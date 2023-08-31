import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

type CurrencyInfo = {
  code: string;
  name: string;
  ask: string;
};

type Rate = {
  [key: string]: CurrencyInfo;
};

export type Expenses = {
  id: number,
  value: string,
  currency: string,
  method: string,
  tag: string,
  description: string,
};

export type ExpensesWithRate = {
  exchangeRates: Rate,
} & Expenses;

export type User = {
  email: string
};

export type Wallet = {
  currencies: string[],
  expenses: ExpensesWithRate[],
  editor: boolean,
  idToEdit: number
};

export type ReduxState = {
  user: User,
  wallet: Wallet,
};

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;
