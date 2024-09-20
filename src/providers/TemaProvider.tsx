import React, { createContext, ReactNode, useContext } from 'react';
import useTema from '../hooks/useTema';

type TemaContextType = ReturnType<typeof useTema>;

const TemaContext = createContext<TemaContextType | undefined>(undefined);

export const TemaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const tema = useTema();

  return (
    <TemaContext.Provider value={tema}>
      {children}
    </TemaContext.Provider>
  );
};

export const useTemaContext = () => {
  const context = useContext(TemaContext);
  if (context === undefined) {
    throw new Error('useTemaContext must be used within a TemaProvider');
  }
  return context;
};