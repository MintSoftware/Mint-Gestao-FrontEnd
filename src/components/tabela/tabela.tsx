import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ColumnDef, ColumnFiltersState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Paginacao } from "./paginacao";
import { EsconderColunas } from "./esconderColunas";
import React from "react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Dialog } from "../ui/dialog";

interface TabelaProps<TData, TValue> {
    colunas: ColumnDef<TData, TValue>[];
    dados: any;
    modal: any;
}

const Tabela = <TData, TValue>({ colunas, dados, modal }: TabelaProps<TData, TValue>) => {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = React.useState("")

    const tabela = useReactTable({
        columns: colunas,
        data: dados,
        state: {
            sorting,
            globalFilter,
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
    });
    return (
        <Dialog>
            <div className="">
                <div className="flex items-center pt-[20px] pb-[20px]">
                    <Input
                        value={tabela.getState().globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Pesquisar..."
                        className="w-[30%]"
                    />
                    {modal}
                    <EsconderColunas table={tabela} />
                </div>
                <div className="rounded-md border">
                    <ScrollArea className="w-full h-[60vh]">
                        <Table>
                            <TableHeader>
                                {tabela.getHeaderGroups().map((headerGroup) => (
                                    <TableRow className="sticky top0" key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            )
                                        }
                                        )}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {tabela.getRowModel().rows.length ? (
                                    tabela.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))
                                            }
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={colunas.length} className="text-center">
                                            Nenhum resultado encontrado
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </div>
                <Paginacao table={tabela} />
            </div>
        </Dialog>
    )
}

export default Tabela;