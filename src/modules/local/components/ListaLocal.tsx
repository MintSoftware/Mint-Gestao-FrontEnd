import Tabela from "@/core/tabela/tabela";
import { useLocalContext } from "@/providers/LocalProvider";
import { useEffect } from "react";
import CadastroLocal from "./CadastroLocal";
import { colunas } from "./Colunas";
import ExportarLocal from "./Exportar";

export function ListaLocal() {
    const { locais, recarrecarLocais, buscarLocais, loading } = useLocalContext();

    useEffect(() => {
        buscarLocais();
    }, [recarrecarLocais]);

    return (
        <Tabela
            colunas={colunas()}
            dados={locais}
            modal={<CadastroLocal />}
            exportar={ExportarLocal(locais)}
            functionSearch={buscarLocais}
            loading={loading}
        />
    )
}