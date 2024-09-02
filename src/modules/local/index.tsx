import Tabela from "@/components/tabela/tabela";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Api from "@/infra/api";
import { Local } from "@/types/Local";
import { useEffect, useState } from "react";
import CadastroLocal from "./cadastro";
import colunas from "./colunas";
import ExportarLocal from "./exportar";
import RegistrarLocal from "./cadastroNovo/page";

export default function Locais() {
    const [locais, setLocais] = useState<Local[]>([]);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        buscarLocais();
    }, []);

    const buscarLocais = async () => {
        try {
            setLoading(true);
            const { data } = await Api.get('gestao/local');
            setLocais(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast({
                title: "Erro!",
                description: `Ocorreu um erro ao buscar os locais: ${error}`,
                variant: "destructive",
                action: <ToastAction altText="Tentar Novamente" onClick={() => buscarLocais()}>Tentar novamente</ToastAction>,
            });
        }
    };

    return (
        <div className="w-[100%] px-5 pt-[50px] h-[100%]">
            <Label className="text-xl p-5">Locais</Label>
            <Tabela
                colunas={colunas()}
                dados={locais}
                modal={<RegistrarLocal />}
                exportar={ExportarLocal(locais)}
                functionSearch={buscarLocais}
                loading={loading}
            />
        </div>
    )
}   