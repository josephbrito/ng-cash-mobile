import React from 'react';

// verify if user's logged

export interface ILogged {
  isLogged: boolean;
  setIsLogged: (state: boolean) => void;
}

export const LOGGED_DEFAULT_VALUE = {
  isLogged: false,
  setIsLogged: () => {},
};

// data of user logged
export interface IUser {
  id?: number;
  username?: string;
  accountId?: number;
}

export interface IDataUser {
  user: IUser;
  setUser: (user: IUser) => void;
}

export const USER_DEFAULT_VALUE = {
  user: {},
  setUser: () => {},
};

// Balance of user
export interface IBalance {
  id?: number;
  balance?: number;
}

export interface IDataBalance {
  userBalance: IBalance;
  setUserBalance: (balance: IBalance) => void;
}

export const BALANCE_DEFAULT_VALUE = {
  userBalance: {},
  setUserBalance: () => {},
};

// Transactions of user
export interface ITransactions {
  id?: number;
  createdAt?: string;
  debitedAccountId?: number;
  creditedAccountId?: number;
  value?: number;
}

export interface IDataTransactions {
  transactions: ITransactions[];
  setTransactions: (transaction: ITransactions[]) => void;
}

export const TRASACTIONS_DEFAULT_VALUE = {
  transactions: [],
  setTransactions: () => {},
};

//  Generic children

export interface IChildren {
  children: React.ReactNode;
}
