import { ColumnDef, ColumnResizeMode, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import React from "react";
import { Dialog } from "../ui/dialog";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { EsconderColunas } from "./esconderColunas";
import { Paginacao } from "./paginacao";

interface TabelaProps<TData, TValue> {
    colunas: ColumnDef<TData, TValue>[];
    dados: any;
    modal: any;
}

const Tabela = <TData, TValue>({ colunas, dados, modal }: TabelaProps<TData, TValue>) => {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = React.useState("")
    const [columnResizeMode, setColumnResizeMode] =
        React.useState<ColumnResizeMode>('onChange')

    const tabela = useReactTable({
        columns: colunas,
        data: dados,
        state: {
            sorting,
            globalFilter,
        },
        columnResizeMode,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
    });
    return (
        <Dialog>
            <div className="p-5">
                <div className="flex items-center pt-[20px] pb-[20px]">
                    <Input
                        value={tabela.getState().globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Pesquisar..."
                        className="w-[30%] bg-background"
                    />
                    {modal}
                    <EsconderColunas table={tabela} />
                </div>
                <div className="rounded-md border overflow-hidden">
                    <ScrollArea className="w-full h-[68vh]">
                        <Table>
                            <TableHeader>
                                {tabela.getHeaderGroups().map((headerGroup) => (
                                    <TableRow className="sticky top-0" key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}
                                                style={{ width: `${header.getSize()}px` }}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                <div
                                                    {...{
                                                        onMouseDown: header.getResizeHandler(),
                                                        onTouchStart: header.getResizeHandler(),
                                                        className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''} absolute right-0 top-0 h-full cursor-col-resize w-[5px]`,
                                                        style: {
                                                            transform:
                                                                columnResizeMode === 'onEnd' &&
                                                                    header.column.getIsResizing()
                                                                    ? `translateX(${tabela.getState().columnSizingInfo
                                                                        .deltaOffset
                                                                    }px)`
                                                                    : '',
                                                        },
                                                    }}
                                                />
                                            </TableHead>
                                            
                                        )
                                        )}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {tabela.getRowModel().rows.length ? (
                                    tabela.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id} className="bg-background">
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