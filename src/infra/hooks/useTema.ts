import { Tema } from '@/types/Tema';
import { useCallback } from 'react';

const useTema = () => {
    const primaryColorDefault = '#4f46e5';
    const secondaryColorDefault = '#5c5c5c';
    const borderRadiusDefault = '8';
    const isDarkModeDefault = false;

    const salvarTema = useCallback((tema: Tema) => {
      debugger
        localStorage.setItem('tema', JSON.stringify(tema));
    }, []);

    const recuperarTema = useCallback(() => {
        const temaJSON = localStorage.getItem('tema');
        return temaJSON ? JSON.parse(temaJSON) : null;
    }, []);

    const alterarTema = useCallback(() => {
        const tema = recuperarTema();

        if (!tema) return;
        
        document.documentElement.style.setProperty('--primary', tema.primaryColor || primaryColorDefault)
        document.documentElement.style.setProperty('--secondary', tema.secondaryColor || secondaryColorDefault)
        document.documentElement.style.setProperty('--radius', `${tema.borderRadius}px` || borderRadiusDefault)
        document.documentElement.classList.toggle('dark', tema.isDarkMode || isDarkModeDefault)
    }, []);

    const redefinirTema = useCallback(() => {
        document.documentElement.style.setProperty('--primary', primaryColorDefault)
        document.documentElement.style.setProperty('--secondary', secondaryColorDefault)
        document.documentElement.style.setProperty('--radius', `${borderRadiusDefault}px`)
        document.documentElement.classList.toggle('dark', isDarkModeDefault)
    }, []);

    return {
        salvarTema,
        recuperarTema,
        alterarTema,
        redefinirTema
    };
};

export default useTema;