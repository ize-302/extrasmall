import { createContext, useContext } from 'react';

export const UserContext = createContext({
  user: {},
  setuser: (data) => {},
  logout: () => {},
});

export const useUser = () => useContext(UserContext);
