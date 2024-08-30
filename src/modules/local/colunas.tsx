import Cabecalho from "@/components/tabela/cabecalho"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import Api from "@/infra/api"
import { Local } from "@/types/Local"
import { ColumnDef } from "@tanstack/react-table"
import { EllipsisVerticalIcon } from "lucide-react"

const inativar = (local: Local) => async () => {
    await Api.put(`gestao/local/${local.id}/inativar`)
}

const ativar = (local: Local) => async () => {
    await Api.put(`gestao/local/${local.id}/ativar`)
}

export const colunas = (): ColumnDef<Local>[] => [{

    id: "select",
    header: ({ table }) => (
        <Checkbox
            checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="mr-5"
        />
    ),
    cell: ({ row }) => (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="relative left-2"
        />
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
            <Badge className='flex mx-[20%] left-[50%] justify-center items-center' variant={row.original.status ? "outline" : "secondary"}>
                {row.original.status.toString() === '1' ? "Ativo" : "Inativo"}
            </Badge>
    ),
}, {
    accessorKey: 'endereco',
    size: 250,
    header: ({ column }) => (
        <Cabecalho column={column} title="Endereço" />
    ),
    cell: ({ row }) => (
        <Label className="relative left-3">{row.original.endereco}</Label>
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
    size: 270,
    header: ({ column }) => (
        <Cabecalho column={column} title="Observação" />
    ),
    cell: ({ row }) => (
        <Label className="relative left-3">{row.original.observacao}</Label>
    ),
}, {
    accessorKey: 'horaAbertura',
    size: 200,
    header: ({ column }) => (
        <Cabecalho column={column} title="Hora Aber." />
    ),
    cell: ({ row }) => (
        <Label className="relative left-3">{row.original.horaAbertura.toString()}</Label>
    ),
}, {
    accessorKey: 'horaFechamento',
    size: 200,
    header: ({ column }) => (
        <Cabecalho column={column} title="Hora Fim" />
    ),
    cell: ({ row }) => (
        <Label className="relative left-3">{row.original.horaFechamento.toString()}</Label>
    ),
}, {
    accessorKey: 'diasFuncionamento',
    size: 200,
    header: ({ column }) => (
        <Cabecalho column={column} title="Dias Func." />
    ),
    cell: ({ row }) => (
        <Label className="relative left-3">{row.original.diasFuncionamento.toString()}</Label>
    ),
}, {
    id: "actions",
    size: 50,
    cell: ({ row }) => {
        // const local = row.original;

        return (
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
                    <DropdownMenuItem className="cursor-pointer">   Editar</DropdownMenuItem>
                    {row.original.status.toString() === '1' ?
                        <DropdownMenuItem onClick={inativar(row.original)} className="cursor-pointer text-red-500">Inativar</DropdownMenuItem>
                        : <DropdownMenuItem onClick={ativar(row.original)} className="cursor-pointer text-green-500">Ativar</DropdownMenuItem>
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        )
    },
    enableSorting: false,
    enableHiding: false,
}
]

export default colunas