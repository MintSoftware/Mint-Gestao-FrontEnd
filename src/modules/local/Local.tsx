import Tabela from "@/components/tabela/tabela";
import { Label } from "@/components/ui/label";
import CadastroLocal from "./components/cadastro/CadastroLocal";
import { colunas } from "./components/Colunas";
import ExportarLocal from "./components/Exportar";
import { useLocalController } from "./Localcontroller";

export default function Locais() {
    const { locais, loading, buscarLocais } = useLocalController();

    return (
        <div className="w-[100%] px-5 pt-[50px] h-[100%]">
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