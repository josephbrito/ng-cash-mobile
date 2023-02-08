import {createContext, useContext, useState} from 'react';
import {IChildren, IDataUser, IUser, USER_DEFAULT_VALUE} from './types';

const UserContext = createContext<IDataUser>(USER_DEFAULT_VALUE);

export function UserProvider({children}: IChildren) {
  const [user, setUser] = useState<IUser>({});

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}

export function useData() {
  const {user, setUser} = useContext(UserContext);

  return {user, setUser};
}
