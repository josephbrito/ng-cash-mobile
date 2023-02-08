import {createContext, useContext, useState} from 'react';
import {IChildren, ILogged, LOGGED_DEFAULT_VALUE} from './types';

const LoggedContext = createContext<ILogged>(LOGGED_DEFAULT_VALUE);

export function LoggedProvider({children}: IChildren) {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <LoggedContext.Provider value={{isLogged, setIsLogged}}>
      {children}
    </LoggedContext.Provider>
  );
}

export function useLogged() {
  const {isLogged, setIsLogged} = useContext(LoggedContext);

  return {isLogged, setIsLogged};
}
