import Api from "@/infra/api";
import { useAutenticacaoContext } from "@/providers/AutenticacaoProvider";
import { useTemaContext } from "@/providers/TemaProvider";
import { useState } from "react";
import { toast } from "sonner";

export function useLoginController() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const { salvarUsuario, salvarToken, salvarRefreshToken, inserirTokenHeader } = useAutenticacaoContext();
    const { salvarTema, alterarTema } = useTemaContext();


    const logar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dto = {
            email,
            senha
        }

        toast.promise(Api.post("autenticacao/entrar", dto, {
            method: "POST",
        }).then(async (response) => {
            salvarUsuario(response.data.usuario);
            salvarToken(response.data.token);
            salvarRefreshToken(response.data.refreshToken);
            inserirTokenHeader();
            if (response.data.tema) {
                salvarTema(response.data.tema);
                alterarTema();
            }
            toast.success("Login realizado com sucesso!");
        }).catch(() => {
            toast.error("Erro ao entrar, verifique suas credenciais!");
        }), {
            loading: "Entrando...",
        });
    }

    return {
        email,
        setEmail,
        senha,
        setSenha,
        logar
    }
}