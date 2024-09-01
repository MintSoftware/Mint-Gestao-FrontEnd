import Api from '@/infra/api';
import { Usuario } from '@/types/Usuario';
import { useCallback, useState } from 'react';

const useAutenticacao = () => {

    const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null);

    const salvarUsuario = useCallback((usuario: Usuario) => {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        setUsuarioLogado(usuario);
    }, []);

    const recuperarUsuario = useCallback(() => {
        const usuarioJSON = localStorage.getItem('usuario');
        const usuario = usuarioJSON ? JSON.parse(usuarioJSON) : null;
        setUsuarioLogado(usuario);
        return usuario;
    }, []);

    const removerUsuario = useCallback(() => {
        localStorage.removeItem('usuario');
        setUsuarioLogado(null);
    }, []);

    const salvarToken = useCallback((token: string) => {
        localStorage.setItem('token', token);
    }, []);

    const recuperarToken = useCallback(() => {
        return localStorage.getItem('token');
    }, []);

    const removerToken = useCallback(() => {
        localStorage.removeItem('token');
    }, []);

    const salvarRefreshToken = useCallback((refreshToken: string) => {
        localStorage.setItem('refreshToken', refreshToken);
    }, []);

    const recuperarRefreshToken = useCallback(() => {
        return localStorage.getItem('refreshToken');
    }, []);

    const removerRefreshToken = useCallback(() => {
        localStorage.removeItem('refreshToken');
    }, []);

    const inserirTokenHeader = useCallback(() => {
        const token = recuperarToken();
        if (token) {
            Api.defaults.headers['token'] = `Bearer ${token}`;
        }
    }, []);

    const removerTokenHeader = useCallback(() => {
        delete Api.defaults.headers['token'];
    }, []);

    const deslogar = useCallback(() => {
        removerUsuario();
        removerToken();
        removerRefreshToken();
        removerTokenHeader();
        window.location.href = '/';
    }, []);

    const atualizarToken = useCallback(async () => {
        const refreshToken = recuperarRefreshToken();

        if (!refreshToken) return;

        try {
            const { data } = await Api.post('autenticacao/atualizartoken', { refreshToken });

            if (data) {
                salvarToken(data);
                inserirTokenHeader();
            }
        } catch (error) {
            return deslogar();
        }
    }, []);

    return {
        usuarioLogado,
        salvarUsuario,
        recuperarUsuario,
        removerUsuario,
        salvarToken,
        recuperarToken,
        removerToken,
        salvarRefreshToken,
        recuperarRefreshToken,
        removerRefreshToken,
        inserirTokenHeader,
        removerTokenHeader,
        deslogar,
        atualizarToken
    };
}

export default useAutenticacao;