import { ApiHelper } from "@/infra/helpers/apiHelper";
import { Auth } from "@/types/Auth";
import { User } from "@/types/User";
import { createContext, useState } from "react";

interface AuthContextProps {
    usuarioLogado?: User;
    auth?: Auth;
    // filialSelecionada?: Filial,
    limparUsuarioLogado: () => Promise<void>;
    salvarUsuarioLogado: (dados: any) => Promise<void>;
    recuperarUsuarioLogado: () => Promise<{ user: User, auth: Auth }>;
    // alterarFilialSelecionada: (Filial: Filial) => Promise<void>;

}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: any) {

    const [usuarioLogado, setUsuarioLogado] = useState<User>();
    // const [filialSelecionada, setFilialSelecionada] = useState<Filial>();
    const [auth, setAuth] = useState<Auth>();

    async function recuperarUsuarioLogado() {
        const usuarioLogadoJSON = localStorage.getItem('@usuario'),
            usuarioLogado: User = JSON.parse(usuarioLogadoJSON == null ? 'undefined' : usuarioLogadoJSON),
            token = localStorage.getItem('@token'),
            refreshToken = localStorage.getItem('@refreshToken');
            // filial = JSON.parse(localStorage.getItem('@filial') as string);

        if (refreshToken && token) ApiHelper.setAuthorization({ token: token, refreshToken: refreshToken });

        // setFilialSelecionada(filial.find((filial: Filial) => filial.padrao));
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
        localStorage.setItem('@usuario', JSON.stringify(dados.usuario));
        setUsuarioLogado(dados.usuario);
        // localStorage.setItem('@filial', JSON.stringify(dados.usuario.filiais));
        // setFilialSelecionada(dados.usuario.filiais.find((filial: Filial) => filial.padrao == true));

        if (dados.token) {
            const auth = { token: dados.token, refreshToken: dados.refreshToken };
            localStorage.setItem('@token', auth.token);
            localStorage.setItem('@refreshToken', auth.refreshToken);
            setAuth(auth);
            ApiHelper.setAuthorization({ token: auth.token, refreshToken: auth.refreshToken });
        }
    }

    async function limparUsuarioLogado() {
        localStorage.removeItem('@usuario');
        localStorage.removeItem('@filial');
        localStorage.removeItem('@token');
        localStorage.removeItem('@refreshToken');
        setUsuarioLogado(undefined);
        setAuth(undefined);
        ApiHelper.clearAuthorization();
    }

    // async function alterarFilialSelecionada(filial: Filial) {
    //     try {
    //         const { data } = await Api.put(`gestao/filial/${filial.id}/alterarfilialpadrao`, filial)
    //         if (data) {
    //             toast({
    //                 variant: "success",
    //                 description: "Filial alterada com sucesso!",
    //             })
    //         }
    //     } catch (error: any) {
    //         if (error.response) {
    //             toast({
    //                 variant: "destructive",
    //                 title: "Erro!",
    //                 description: error.response.data,
    //                 action: <ToastAction altText="Tentar Novamente" onClick={() => alterarFilialSelecionada(filial)}>Tentar novamente</ToastAction>,
    //             })

    //         } else {
    //             toast({
    //                 variant: "destructive",
    //                 title: "Erro",
    //                 description: "Erro ao alterar filial!",
    //                 action: <ToastAction altText="Tentar Novamente">Tentar novamente</ToastAction>,
    //             })
    //         }
    //     }
    //     setFilialSelecionada(filial);
    //     try {
    //         const { data } = await Api.get('gestao/filial')
    //         localStorage.setItem('@filial', JSON.stringify(data));
    //     } catch (error: any) {
    //         toast({
    //             variant: "destructive",
    //             title: "Erro!",
    //             description: "Erro ao alterar filial!",
    //             action: <ToastAction altText="Tentar Novamente" onClick={() => alterarFilialSelecionada(filial)}>Tentar novamente</ToastAction>,
    //         })
    //     }

    return (
        <AuthContext.Provider value={{
            recuperarUsuarioLogado,
            salvarUsuarioLogado,
            limparUsuarioLogado,
            usuarioLogado,
            auth,
            // alterarFilialSelecionada,
            // filialSelecionada
        }}>
            {children}
        </AuthContext.Provider>
    )
}