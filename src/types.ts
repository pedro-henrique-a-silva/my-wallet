export type User = {
  email: string
};

export type Wallet = {
  currencies: string[],
  expenses: string[],
  editor: boolean,
  idToEdit: number
};

export type ReduxState = {
  user: User,
  wallet: Wallet,
};
