import Tabela from "@/components/tabela/tabela";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import CadastroLocal from "./CadastroLocal";
import { colunas } from "./components/Colunas";
import ExportarLocal from "./components/Exportar";
import { useLocalController } from "./Localcontroller";

export default function Locais() {
    const { locais, loading, buscarLocais } = useLocalController();

    useEffect(() => {
        buscarLocais();
    }, []);

    return (
        <div className="flex flex-col w-full">
            <Label className="text-xl p-5">Locais</Label>
            <Tabela
                colunas={colunas()}
                dados={locais}
                modal={<CadastroLocal />}
                exportar={ExportarLocal(locais)}
                functionSearch={buscarLocais}
                loading={loading}
            />
        </div>
    )
}   