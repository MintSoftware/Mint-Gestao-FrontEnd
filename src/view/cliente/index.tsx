import Tabela from "@/components/tabela/tabela";
import { Label } from "@/components/ui/label";
import Api from "@/infra/api";
import { Cliente } from "@/types/Cliente";
import CadastroCliente from "@/view/cliente/cadastro";
import { useEffect, useState } from "react";
import colunas from "./colunas";
import ExportarCliente from "./exportar";

export default function Clientes() {
    const [clientes, setClientes] = useState<Cliente[]>([]);

    useEffect(() => {
        buscarClientes();
    }, []);

    const buscarClientes = async () => {
        try {
            const { data } = await Api.get('cliente');
            setClientes(data);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    };

    return (
        <div id="tabela-clientes" className="w-[100%] px-5 pt-[50px] h-[100%]">
            <Label className="text-xl p-5">Clientes</Label>
            <Tabela
                colunas={colunas()}
                dados={clientes}
                modal={<CadastroCliente />}
                exportar={ExportarCliente(clientes)}
                functionSearch={buscarClientes}
            />
        </div>
    );
}