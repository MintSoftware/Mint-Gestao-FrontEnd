import React, { createContext, useContext } from 'react';
import useAutenticacao from '../hooks/useAutenticacao';

type AutenticacaoContextType = ReturnType<typeof useAutenticacao>;

const AutenticacaoContext = createContext<AutenticacaoContextType | undefined>(undefined);

export const AutenticacaoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const autenticacao = useAutenticacao();

    return (
        <AutenticacaoContext.Provider value={autenticacao}>
            {children}
        </AutenticacaoContext.Provider>
    );
};

export function useAutenticacaoContext() {
    const context = useContext(AutenticacaoContext);
    if (!context) {
        throw new Error('useAutenticacaoContext deve ser usado dentro de um AutenticacaoProvider');
    }
    return context;
}