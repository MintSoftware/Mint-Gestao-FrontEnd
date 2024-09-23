import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, ColumnSizingState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { EyeIcon, SearchIcon } from "lucide-react";
import { useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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

const Tabela = <TData extends { status: string }, TValue>({ colunas, dados, modal, exportar, functionSearch, loading }: TabelaProps<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("Ativo");  // Novo estado para filtro de status
    const [mutableColumns, setMutableColumns] = useState(colunas);
    const [colSizing, setColSizing] = useState<ColumnSizingState>({});

    // Filtrar os dados pelo status selecionado
    const filteredData = useMemo(() => {
        return dados.filter((item) => {
            if (statusFilter === "Todos") return true;
            return item.status === statusFilter;
        });
    }, [statusFilter, dados]);

    const tabela = useReactTable({
        columns: mutableColumns,
        data: filteredData,  // Usando os dados filtrados pelo status
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
            <div className="p-8">
                <div className="gap-3 flex items-center mb-5">
                    <Input
                        value={tabela.getState().globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Pesquisar..."
                        className="bg-background notebook:w-[25rem]"
                    />
                    <Button onClick={functionSearch} variant="outline"><SearchIcon className="w-4 h-4" /></Button>

                    {modal}
                    <div className="ml-auto flex flex-row gap-3 w-full h-full justify-end">
                        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
                            <SelectTrigger className="w-[10rem] h-8 bg-background">
                                <EyeIcon className="mr-2 h-4 w-4" />
                                {statusFilter}
                            </SelectTrigger>
                            <SelectContent className="flex w-full h-full">
                                <SelectItem value="Todos">Todos os registros</SelectItem>
                                <SelectItem value="Ativo">Apenas ativos</SelectItem>
                                <SelectItem value="Inativo">Apenas inativos</SelectItem>
                            </SelectContent>
                        </Select>
                        <EsconderColunas table={tabela} />
                    </div>
                </div>

                <div className="rounded-md border relative bg-background">
                    <DndProvider backend={HTML5Backend}>
                        <ScrollArea className="notebook:h-[27rem] w-[88.4rem] desktop:h-[40rem] desktop:w-[111.4rem]">
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
                <Paginacao table={tabela} exportar={exportar} functionSearch={functionSearch} />
            </div>
        </Dialog >
    );
}

export default Tabela;