import Cabecalho from "@/components/tabela/cabecalho"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Api from "@/infra/api"
import { Cliente } from "@/types/Cliente"
import { ColumnDef } from "@tanstack/react-table"
import { EllipsisVerticalIcon } from "lucide-react"

const inativar = (cliente: Cliente) => async () => {
    await Api.put(`gestao/cliente/${cliente.id}/inativar`)
}

const ativar = (cliente: Cliente) => async () => {
    await Api.put(`gestao/cliente/${cliente.id}/ativar`)
}

export const colunas = (): ColumnDef<Cliente>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    }, {
        accessorKey: 'nome',
        header: ({ column }) => (
            <Cabecalho column={column} title="Nome" />
        ),
    }, {
        accessorKey: 'status',
        header: ({ column }) => (
            <Cabecalho column={column} title="Status" />
        ),
        cell: ({ row }) => (
            <Badge className='w-[60px] justify-center' variant={row.original.status ? "outline" : "secondary"}>
                {row.original.status.toString() === '1' ? "Ativo" : "Inativo"}
            </Badge>
        ),
    }, {
        accessorKey: 'cpf',
        header: ({ column }) => (
            <Cabecalho column={column} title="CPF" />
        ),
    }, {
        accessorKey: 'email',
        header: ({ column }) => (
            <Cabecalho column={column} title="Email" />
        ),
    }, {
        accessorKey: 'telefone',
        header: ({ column }) => (
            <Cabecalho column={column} title="Telefone" />
        ),
    }, {
        id: "actions",
        cell: ({ row }) => {
            const cliente = row.original

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
                        <DropdownMenuItem className="cursor-pointer">Editar</DropdownMenuItem>
                        {row.original.status.toString() === '1' ?
                            <DropdownMenuItem onClick={inativar(row.original)} className="cursor-pointer text-red-500">Inativar</DropdownMenuItem>
                            : <DropdownMenuItem onClick={ativar(row.original)} className="cursor-pointer text-green-500">Ativar</DropdownMenuItem>
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        size: 3,
    }
]

export default colunas