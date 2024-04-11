import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import xlsx, { IJsonSheet } from 'json-as-xlsx';
import { FileOutputIcon } from "lucide-react";

const baixarExcel = (dados : any) => {
    const colunas: IJsonSheet[] = [
        {
            sheet: 'Locais',
            columns: [
                { label: 'ID', value: 'id' },
                { label: 'Nome', value: 'nome' },
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

export default function ExportarCliente(dados: any) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                    <span>Exportar</span>
                    <FileOutputIcon className="p-[2px]" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem>
                    <Button onClick={() => baixarExcel(dados)} variant={'ghost'} className="cursor-pointer h-8 w-full" >Excel</Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <Button onClick={() => baixarExcel(dados)} variant={'ghost'} className="cursor-pointer h-8 w-full" >PDF</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

