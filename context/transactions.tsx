import {createContext, useContext, useState} from 'react';
import {
  IChildren,
  IDataTransactions,
  ITransactions,
  TRASACTIONS_DEFAULT_VALUE,
} from './types';

const TransactionsContext = createContext<IDataTransactions>(
  TRASACTIONS_DEFAULT_VALUE,
);

export function TransactionsProvider({children}: IChildren) {
  const [transactions, setTransactions] = useState<ITransactions[]>([]);

  return (
    <TransactionsContext.Provider value={{transactions, setTransactions}}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const {transactions, setTransactions} = useContext(TransactionsContext);

  return {transactions, setTransactions};
}
