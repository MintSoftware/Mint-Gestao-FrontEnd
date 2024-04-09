import Cabecalho from "@/components/tabela/cabecalho"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Cliente } from "@/types/Cliente"
import { ColumnDef } from "@tanstack/react-table"
import { EllipsisVerticalIcon } from "lucide-react"

export const colunas = (): ColumnDef<Cliente>[] => [
    {
        id: "select",
        minSize: 3,
        maxSize: 3,
        size: 3,
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
    },
    {
        accessorKey: 'nome',
        header: ({ column }) => (
            <Cabecalho column={column} title="Nome" />
        ),
        minSize: 50,
        maxSize: 500,
        size: 100,
    },
    {
        accessorKey: 'cpf',
        header: ({ column }) => (
            <Cabecalho column={column} title="CPF" />
        ),
        size: 10,
        minSize: 10,
        maxSize: 10,
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
            <Cabecalho column={column} title="Email" />
        ),
        size: 30,
        minSize: 10,
        maxSize: 300,
    },
    {
        accessorKey: 'telefone',
        header: ({ column }) => (
            <Cabecalho column={column} title="Telefone" />
        ),
        size: 30,
        minSize: 10,
        maxSize: 300,
    }, {
        id: "actions",
        cell: ({ row }) => {
            const cliente = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <EllipsisVerticalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(cliente.id.toString())}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
        size: 5,
    }
]

export default colunas