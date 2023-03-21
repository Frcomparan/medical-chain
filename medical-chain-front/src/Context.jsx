import React, { createContext, useState } from 'react';
import { useFetchPacients } from './hooks/useFetchPacients';

export const Context = createContext();

const Provider = ({ children }) => {
  const [isHome, setIsHome] = useState(false);
  const { pacients } = useFetchPacients();

  const value = {
    isHome,
    activateHome: () => setIsHome(true),
    deactivateHome: () => setIsHome(false),
    pacients,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default {
  Provider,
  Consumer: Context.Consumer,
};
