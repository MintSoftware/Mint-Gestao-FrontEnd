import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import Cabecalho from "@/core/tabela/cabecalho"
import { useLocalContext } from "@/providers/LocalProvider"
import { Local } from "@/types/Local"
import { ColumnDef } from "@tanstack/react-table"
import { EllipsisVerticalIcon } from "lucide-react"
import EditarLocal from "./EditarLocal"
import VerLocal from "./VerLocal"

export const colunas = (): ColumnDef<Local>[] => {
    const { inativar, ativar } = useLocalContext();

    return [{
        id: "ver",
        size: 50,
        maxSize: 50,
        cell: ({ row }) => (
            <Dialog>
                <VerLocal local={row} />
            </Dialog>
        ),
        enableSorting: false,
        enableHiding: false,
    }, {
        id: "editar",
        size: 50,
        maxSize: 50,
        cell: ({ row }) => (
            <Dialog>
                <EditarLocal local={row} />
            </Dialog>
        ),
        enableSorting: false,
        enableHiding: false,
    }, {
        accessorKey: 'nome',
        size: 400,
        header: ({ column }) => (
            <Cabecalho column={column} title="Nome" />
        ),
        cell: ({ row }) => (
            <Label className="relative left-3">{row.original.nome}</Label>
        ),
    }, {
        accessorKey: 'status',
        size: 100,
        header: ({ column }) => (
            <Cabecalho column={column} title="Status" />
        ),
        cell: ({ row }) => (
            <Badge className={`flex mx-[20%] left-[50%] justify-center items-center color-${row.original.status.toString() === "Ativo" ? "primary" : ""} `}>
                {row.original.status.toString()}
            </Badge>
        ),
    }, {
        accessorKey: 'cep',
        size: 200,
        header: ({ column }) => (
            <Cabecalho column={column} title="CEP" />
        ),
        cell: ({ row }) => (
            <Label className="relative left-3">{row.original.cep}</Label>
        ),
    }, {
        accessorKey: 'estado',
        size: 150,
        header: ({ column }) => (
            <Cabecalho column={column} title="Estado" />
        ),
        cell: ({ row }) => (
            <Label className="relative left-3">{row.original.estado}</Label>
        ),
    }, {
        accessorKey: 'cidade',
        size: 200,
        header: ({ column }) => (
            <Cabecalho column={column} title="Cidade" />
        ),
        cell: ({ row }) => (
            <Label className="relative left-3">{row.original.cidade}</Label>
        ),
    }, {
        accessorKey: 'bairro',
        size: 250,
        header: ({ column }) => (
            <Cabecalho column={column} title="Bairro" />
        ),
        cell: ({ row }) => (
            <Label className="relative left-3">{row.original.bairro}</Label>
        ),
    }, {
        accessorKey: 'rua',
        size: 300,
        header: ({ column }) => (
            <Cabecalho column={column} title="Rua" />
        ),
        cell: ({ row }) => (
            <Label className="relative left-3">{row.original.rua}</Label>
        ),
    }, {
        accessorKey: 'complemento',
        size: 270,
        header: ({ column }) => (
            <Cabecalho column={column} title="Complemento" />
        ),
        cell: ({ row }) => (
            <Label className="relative left-3">{row.original.complemento}</Label>
        ),
    }, {
        accessorKey: 'observacao',
        size: 160,
        header: ({ column }) => (
            <Cabecalho column={column} title="Observação" />
        ),
        cell: ({ row }) => (
            <Label className="relative left-3">{row.original.observacao}</Label>
        ),
    }, {
        accessorKey: 'horarioAbertura',
        size: 200,
        header: ({ column }) => (
            <Cabecalho column={column} title="Hora Abertura" />
        ),
        cell: ({ row }) => (
            <Label className="relative left-3">{row.original.horarioAbertura.slice(0, 5)}</Label>
        ),
    }, {
        accessorKey: 'horarioFechamento',
        size: 200,
        header: ({ column }) => (
            <Cabecalho column={column} title="Hora Fechamento" />
        ),

        cell: ({ row }) => (
            <Label className="relative left-3">{row.original.horarioFechamento.slice(0, 5)}</Label>
        ),
    }, {
        accessorKey: 'diasFuncionamento',
        size: 200,
        header: ({ column }) => (
            <Cabecalho column={column} title="Dias Funcionamento" />
        ),
        cell: ({ row }) => (
            <Label className="relative left-3">{row.original.diasFuncionamento}</Label>
        ),
    }, {
        accessorKey: 'valorHora',
        size: 150,
        header: ({ column }) => (
            <Cabecalho column={column} title="Valor/Hora" />
        ),
        cell: ({ row }) => (
            <Label className="relative left-3">{`R$ ${row.original.valorHora.toFixed(2)}`}</Label>
        ),
    }, {
        id: "actions",
        size: 50,
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <EllipsisVerticalIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="font-bold">Ver</DropdownMenuLabel>
                    <DropdownMenuItem className="cursor-pointer">Historico financeiro</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="font-bold">Ações</DropdownMenuLabel>
                    {row.original.status.toString() === "Ativo" ?
                        <DropdownMenuItem onClick={inativar(row.original)} className="cursor-pointer text-red-500">Inativar</DropdownMenuItem>
                        : <DropdownMenuItem onClick={ativar(row.original)} className="cursor-pointer text-green-500">Ativar</DropdownMenuItem>
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        ),
        enableSorting: false,
        enableHiding: false,
    }
    ];
}
