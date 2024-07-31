import { ColumnDef, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { Dialog } from "../ui/dialog";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { EsconderColunas } from "./esconderColunas";
import { Paginacao } from "./paginacao";

interface TabelaProps<TData, TValue> {
    colunas: ColumnDef<TData, TValue>[];
    dados: any;
    modal?: JSX.Element;
    exportar?: JSX.Element;
    functionSearch: () => Promise<void>;
    loading: boolean;
}

const Tabela = <TData, TValue>({ colunas, dados, modal, exportar, functionSearch, loading }: TabelaProps<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = useState("")

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
            <div className="p-5">
                <div className="gap-3 flex items-center pt-[20px] pb-[20px]">
                    <Input
                        value={tabela.getState().globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Pesquisar..."
                        className="w-[30%] bg-background"
                    />
                    {modal}
                    <div className="ml-auto flex flex-row gap-3">
                        {exportar}
                        <EsconderColunas table={tabela} />
                    </div>
                </div>
                <div className="rounded-md border relative">
                    <ScrollArea className="h-[68vh]">
                        <Table>
                            <TableHeader>
                                {tabela.getHeaderGroups().map((headerGroup) => (
                                    <TableRow className="sticky top-0" key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}
                                                style={{
                                                    width: `${header.getSize()}px`,
                                                    resize: "horizontal",
                                                    overflow: 'auto'
                                                }}
                                                className="sticky top-0 text-muted-foreground"
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        ))}
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
                                            <TableCell colSpan={colunas.length} className="text-center">
                                                Nenhum resultado encontrado
                                            </TableCell>
                                        </TableRow>
                                    )
                                ) : null}
                            </TableBody>
                        </Table>
                        {loading && (
                            <div className="absolute inset-0 grid place-items-center">
                                <LoaderCircleIcon className="animate-spin h-10 w-10 text-primary" />
                            </div>
                        )}
                    </ScrollArea>
                </div>
                <Paginacao table={tabela} functionSearch={functionSearch} />
            </div>
        </Dialog>
    )
}

export default Tabela;