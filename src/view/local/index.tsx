import Tabela from "@/components/tabela/tabela";
import { Label } from "@/components/ui/label";
import Api from "@/infra/api";
import { Local } from "@/types/Local";
import CadastroLocal from "@/view/local/cadastro";
import { useEffect, useState } from "react";
import colunas from "./colunas";
import ExportarLocal from "./exportar";

export default function Locais() {
    const [locais, setLocais] = useState<Local[]>([]);

    useEffect(() => {
        buscarLocais();
    }, []);

    const buscarLocais = async () => {
        try {
            const { data } = await Api.get('local');
            setLocais(data);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    };

    return (
        <div className="w-[100%] px-5 pt-[50px] h-[100%]">
            <Label className="text-xl p-5">Locais</Label>
            <Tabela
                colunas={colunas()}
                dados={locais}
                modal={<CadastroLocal/>}
                exportar={ExportarLocal(locais)}
                functionSearch={buscarLocais}
            />
        </div>
    )
}   