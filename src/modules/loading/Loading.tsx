import { Progress } from "@/components/ui/progress";
import { useAutenticacaoContext } from "@/infra/providers/AutenticacaoProvider";
import { useTemaContext } from "@/infra/providers/TemaProvider";
import { useEffect, useState } from "react";

export default function Loading() {
    const [progress, setProgress] = useState(0);
    const { alterarTema } = useTemaContext();
    const { atualizarToken, recuperarUsuario, salvarUsuario } = useAutenticacaoContext();

    useEffect(() => {
        atualizarToken();
        alterarTema();
        const usuario = recuperarUsuario();
        if (usuario) salvarUsuario(usuario);
        const interval = setInterval(() => {
            setProgress((prev) => (prev < 90 ? prev + 10 : 90));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background">
            <div className="max-w-md w-full space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-primary">Carregando...</h1>
                    <p className="text-muted-foreground">Por Favor, aguarde enquanto preparamos tudo para você.</p>
                </div>
                <Progress value={progress} className="h-4 w-full rounded-full bg-muted" />
                <div className="absolute left-0 bottom-[95px] h-full w-full flex items-center justify-center text-white font-medium">
                    {progress}%
                </div>
                <div className="flex justify-center space-x-4">
                    <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
                    <div className="w-8 h-8 bg-muted rounded-full animate-pulse delay-100" />
                    <div className="w-8 h-8 bg-muted rounded-full animate-pulse delay-200" />
                </div>
            </div>
        </div>
    );
}