import React, { createContext, useContext, ReactNode } from 'react';
import { Tema } from '@/types/Tema';
import useTema from '../hooks/useTema';

interface TemaContextType {
  salvarTema: (tema: Tema) => void;
  recuperarTema: () => Tema | null;
  alterarTema: () => void;
}

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
