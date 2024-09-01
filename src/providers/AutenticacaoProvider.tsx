import React, { createContext, useContext } from 'react';
import { Usuario } from '@/types/Usuario';
import useAutenticacao from '../hooks/useAutenticacao';

interface AutenticacaoContextData {
    usuarioLogado: Usuario | null;
    salvarUsuario: (usuario: Usuario) => void;
    recuperarUsuario: () => Usuario | null;
    removerUsuario: () => void;
    salvarToken: (token: string) => void;
    recuperarToken: () => string | null;
    removerToken: () => void;
    salvarRefreshToken: (refreshToken: string) => void;
    recuperarRefreshToken: () => string | null;
    removerRefreshToken: () => void;
    inserirTokenHeader: () => void;
    removerTokenHeader: () => void;
    deslogar: () => void;
    atualizarToken: () => Promise<void>;
}

const AutenticacaoContext = createContext<AutenticacaoContextData | undefined>(undefined);

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