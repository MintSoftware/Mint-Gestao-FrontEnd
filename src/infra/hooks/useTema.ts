import { Tema } from '@/types/Tema';
import { useCallback } from 'react';
import Api from '../api';

const useTema = () => {

    const salvarTema = useCallback((tema: Tema) => {
        localStorage.setItem('tema', JSON.stringify(tema));
    }, []);

    const recuperarTema = useCallback(() => {
        const temaJSON = localStorage.getItem('tema');
        return temaJSON ? JSON.parse(temaJSON) : null;
    }, []);

    const alterarTema = useCallback(() => {
        const tema = recuperarTema();

        if (!tema) return;
        
        document.documentElement.style.setProperty('--primary', tema.primaryColor)
        document.documentElement.style.setProperty('--secondary', tema.secondaryColor)
        document.documentElement.style.setProperty('--radius', `${tema.borderRadius}px`)
        document.documentElement.classList.toggle('dark', tema.isDarkMode)
    }, [salvarTema]);

    return {
        salvarTema,
        recuperarTema,
        alterarTema
    };
};

export default useTema;