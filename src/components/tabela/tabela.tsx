import {
    ColumnDef, ColumnSizingState, SortingState, flexRender, getCoreRowModel,
    getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable
} from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { Input } from "../ui/input";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { DraggableCol } from './colunas';
import { EsconderColunas } from "./esconderColunas";
import { Paginacao } from "./paginacao";
import "./skeletonLoader.css";

interface TabelaProps<TData, TValue> {
    colunas: ColumnDef<TData, TValue>[];
    dados: TData[];
    modal?: JSX.Element;
    exportar?: JSX.Element;
    functionSearch: () => Promise<void>;
    loading: boolean;
}

const Tabela = <TData, TValue>({ colunas, dados, modal, exportar, functionSearch, loading }: TabelaProps<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = useState("")
    const [mutableColumns, setMutableColumns] = useState(colunas);
    const [colSizing, setColSizing] = useState<ColumnSizingState>({});

    const tabela = useReactTable({
        columns: mutableColumns,
        data: dados,
        state: {
            sorting,
            globalFilter,
            columnSizing: colSizing,
        },
        initialState: {
            columnVisibility: {
                cep: false,
                estado: false,
                cidade: false,
                bairro: false,
                rua: false,
                complemento: false,
                images: false,

            }
        },
        enableColumnResizing: true,
        columnResizeMode: "onChange",
        onColumnSizingChange: setColSizing,

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
                <div className="gap-3 flex items-center pt-[15px] pb-[20px]">
                    <Input
                        value={tabela.getState().globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Pesquisar..."
                        className="w-[30%] bg-background"
                    />
                    <Button onClick={functionSearch} variant="outline"><SearchIcon className="w-4 h-4" /></Button>
                    {modal}
                    <div className="ml-auto flex flex-row gap-3">
                        {exportar}
                        <EsconderColunas table={tabela} />
                    </div>
                </div>
                <div className="rounded-md border relative bg-background">
                    <DndProvider backend={HTML5Backend}>
                        <ScrollArea className="h-[38rem] w-[111.4rem]">
                            <Table style={{ width: tabela.getTotalSize() }}>
                                <TableHeader>
                                    {tabela.getHeaderGroups().map((headerGroup) => (
                                        <TableRow className="sticky top-0" key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => {
                                                const columnOrder = headerGroup.headers.map((header, index) => ({ id: header.column.id, index }));
                                                return (
                                                    <DraggableCol
                                                        key={header.id}
                                                        header={header}
                                                        col={header.column}
                                                        columnOrder={columnOrder}
                                                        columns={mutableColumns}
                                                        setColumns={setMutableColumns}
                                                    />
                                                );
                                            })}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {!loading ? (
                                        tabela.getRowModel().rows.length ? (
                                            tabela.getRowModel().rows.map((row) => (
                                                <TableRow key={row.id} className="bg-background">
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell key={cell.id}>
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={colunas.length} className="bg-background relative left-[40vw]">
                                                    Nenhum resultado encontrado
                                                </TableCell>
                                            </TableRow>
                                        )
                                    ) : null}
                                </TableBody>
                            </Table>
                            {loading && Array.from({ length: 15 }).map((_, index) => (
                                <div key={index} className="inset-0 flex place-items-center">
                                    <div className="h-full w-full flex">
                                        {loading && Array.from({ length: 5 }).map((_, index) => (
                                            <div key={index} className="inset-0 flex place-items-center">
                                                <div className="flex h-full w-full p-2">
                                                    <Skeleton
                                                        className=" flex skeleton"
                                                        style={{
                                                            animation: `dynamicWidth infinite ${(Math.random() * (7 - 2) + 2)}s ease-in-out`
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </DndProvider>
                </div>
                <Paginacao table={tabela} functionSearch={functionSearch} />
            </div>
        </Dialog >
    );
}

export default Tabela;