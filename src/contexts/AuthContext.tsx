import { createContext, useState } from "react";
import { ApiHelper } from "@/infra/helpers/apiHelper";
import { Auth } from "@/types/Auth";
import { User } from "@/types/User";

interface AuthContextProps {
    usuarioLogado?: User;
    auth?: Auth;
    limparUsuarioLogado: () => Promise<void>;
    salvarUsuarioLogado: (dados: any) => Promise<void>;
    recuperarUsuarioLogado: () => Promise<{ user: User, auth: Auth }>;

}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: any) {

    const [usuarioLogado, setUsuarioLogado] = useState<User>();
    const [auth, setAuth] = useState<Auth>();

    async function recuperarUsuarioLogado() {
        const usuarioLogadoJSON = localStorage.getItem('@userLogged'),
            usuarioLogado: User = JSON.parse(usuarioLogadoJSON == null ? 'undefined' : usuarioLogadoJSON),
            token = localStorage.getItem('@token'),
            refreshToken = localStorage.getItem('@refreshToken');

        if (refreshToken && token) ApiHelper.setAuthorization({ token: token, refreshToken: refreshToken });

        setUsuarioLogado(usuarioLogado);

        return {
            user: usuarioLogado,
            auth: {
                token: token ? token : '',
                refreshToken: refreshToken ? refreshToken : ''
            }
        }
    }

    async function salvarUsuarioLogado(dados: any) {
        const usuario = { nome: dados.nome, email: dados.email };
        localStorage.setItem('@userLogged', JSON.stringify(usuario));
        setUsuarioLogado(usuario);


        if (dados.token) {
            const auth = { token: dados.token, refreshToken: dados.refreshToken };
            localStorage.setItem('@token', JSON.stringify(auth.token));
            localStorage.setItem('@refreshToken', JSON.stringify(auth.refreshToken));
            setAuth(auth);
            ApiHelper.setAuthorization({ token: auth.token, refreshToken: auth.refreshToken });
        }
    }

    async function limparUsuarioLogado() {
        localStorage.removeItem('@userLogged');
        localStorage.removeItem('@token');
        localStorage.removeItem('@refreshToken');
        setUsuarioLogado(undefined);
        setAuth(undefined);
        ApiHelper.clearAuthorization();
    }

    return (
        <AuthContext.Provider value={{
            recuperarUsuarioLogado,
            salvarUsuarioLogado,
            limparUsuarioLogado,
            usuarioLogado,
            auth
        }}>
            {children}
        </AuthContext.Provider>
    )
}