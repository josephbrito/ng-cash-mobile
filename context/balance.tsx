import {createContext, useContext, useState} from 'react';
import {
  BALANCE_DEFAULT_VALUE,
  IBalance,
  IChildren,
  IDataBalance,
} from './types';

const BalanceContext = createContext<IDataBalance>(BALANCE_DEFAULT_VALUE);

export function BalanceProvider({children}: IChildren) {
  const [userBalance, setUserBalance] = useState<IBalance>({});

  return (
    <BalanceContext.Provider value={{userBalance, setUserBalance}}>
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  const {userBalance, setUserBalance} = useContext(BalanceContext);

  return {userBalance, setUserBalance};
}
