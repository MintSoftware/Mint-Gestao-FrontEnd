import Tabela from "@/components/tabela/tabela";
import { Label } from "@/components/ui/label";
import Api from "@/infra/api";
import { Cliente } from "@/types/Cliente";
import CadastroCliente from "@/view/cliente/cadastro";
import { useEffect, useState } from "react";
import colunas from "./colunas";
import ExportarCliente from "./exportar";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function Clientes() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        buscarClientes();
    }, []);

    const buscarClientes = async () => {
        try {
            setLoading(true);
            const { data } = await Api.get('gestao/cliente');
            setClientes(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast({
                title: "Erro!",
                description: `Ocorreu um erro ao buscar os clientes: ${error}`,
                variant: "destructive",
                action: <ToastAction altText="Tentar Novamente" onClick={() => buscarClientes()}>Tentar novamente</ToastAction>,
            });
            
        }
    };

    return (
        <div id="tabela-clientes" className="w-full px-5 pt-[50px] h-full">
            <Label className="text-xl p-5">Clientes</Label>
            <Tabela
                colunas={colunas()}
                dados={clientes}
                modal={<CadastroCliente />}
                exportar={ExportarCliente(clientes)}
                functionSearch={buscarClientes}
                loading={loading}
            />
        </div>
    );
}