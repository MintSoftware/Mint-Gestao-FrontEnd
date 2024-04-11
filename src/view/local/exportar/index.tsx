import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import xlsx, { IJsonSheet } from 'json-as-xlsx';
import { FileOutputIcon } from "lucide-react";
import generatePDF from "react-to-pdf";

const recuperarDadosParaPdf = () => document.getElementById('root');

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

export default function ExportarLocal(dados: any) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="h-8 items-center gap-1"
                    variant={'outline'}>
                    <FileOutputIcon className="mr-2 h-4 w-4" />
                    Exportar
                    <ChevronDownIcon className=" text-muted-foreground transition-transform duration-200" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem>
                    <Button onClick={() => baixarExcel(dados)} variant={'ghost'} className="cursor-pointer h-5 w-full" >Excel</Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Button onClick={() => generatePDF(recuperarDadosParaPdf)} variant={'ghost'} className="cursor-pointer h-5 w-full" >PDF</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

