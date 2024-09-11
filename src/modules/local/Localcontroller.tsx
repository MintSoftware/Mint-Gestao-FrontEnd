import Api from "@/infra/api";
import { Local } from "@/types/Local";
import xlsx, { IJsonSheet } from "json-as-xlsx";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useLocalController() {
    const [locais, setLocais] = useState<Local[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        buscarLocais();
    }, []);

    const recuperarDadosParaPdf = () => document.getElementById('root');

    const baixarExcel = (dados: any) => {
        const colunas: IJsonSheet[] = [
            {
                sheet: 'Locais',
                columns: [
                    { label: 'ID', value: 'id' },
                    { label: 'Nome', value: 'nome' },
                    { label: "Status", value: "status" },
                    { label: 'Endereço', value: 'endereco' },
                    { label: 'Complemento', value: 'complemento' },
                    { label: 'Observação', value: 'observacao' },
                    { label: 'Hora de Abertura', value: 'horaAbertura' },
                    { label: 'Hora de Fechamento', value: 'horaFechamento' },
                    { label: 'Dias de Funcionamento', value: 'diasFuncionamento' },
                ],
                content: dados
            }
        ];

        const configuracao = {
            fileName: "Locais"
        }

        xlsx(colunas, configuracao)
    }

    const inativar = (local: Local) => async () => {
        await Api.put(`gestao/local/${local.id}/inativar`)
    }

    const ativar = (local: Local) => async () => {
        await Api.put(`gestao/local/${local.id}/ativar`)
    }

    const editar = () => {
        console.log("Editar")
    }

    const buscarLocais = async () => {
        try {
            setLoading(true);
            const { data } = await Api.get('gestao/local');
            setLocais(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(`Ocorreu um erro ao buscar os locais: ${error}`);
        }
    };

    return {
        locais,
        loading,
        buscarLocais,
        toast,
        baixarExcel,
        recuperarDadosParaPdf,
        inativar,
        ativar,
        editar,
    }
}