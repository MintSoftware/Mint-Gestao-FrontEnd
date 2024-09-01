import { Tema } from '@/types/Tema';
import { useCallback } from 'react';

const useTema = () => {
    const primaryColorDefault = '#03bb85';
    const secondaryColorDefault = '#303030';
    const borderRadiusDefault = '8';
    const darkModeDefault = false;

    const salvarTema = useCallback((tema: Tema) => {
        localStorage.setItem('tema', JSON.stringify(tema));
    }, []);

    const recuperarTema = useCallback(() => {
        const temaJSON = localStorage.getItem('tema');
        return temaJSON ? JSON.parse(temaJSON) : null;
    }, []);

    const alterarTema = useCallback(() => {
        const tema : Tema = recuperarTema();
        
        document.documentElement.style.setProperty('--primary', tema?.primaryColor || primaryColorDefault)
        document.documentElement.style.setProperty('--secondary', tema?.secondaryColor || secondaryColorDefault)
        document.documentElement.style.setProperty('--radius', `${tema?.borderRadius}px` || `${borderRadiusDefault}px`)
        document.documentElement.classList.toggle('dark', tema?.darkMode || darkModeDefault)
    }, []);

    const redefinirTema = useCallback(() => {
        document.documentElement.style.setProperty('--primary', primaryColorDefault)
        document.documentElement.style.setProperty('--secondary', secondaryColorDefault)
        document.documentElement.style.setProperty('--radius', `${borderRadiusDefault}px`)
        document.documentElement.classList.toggle('dark', darkModeDefault)
    }, []);

    return {
        salvarTema,
        recuperarTema,
        alterarTema,
        redefinirTema
    };
};

export default useTema;