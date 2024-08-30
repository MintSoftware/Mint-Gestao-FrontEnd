import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface MovimentosFinancProps {
    movimentacoes: {
        id: number;
        data: string;
        descricao: string;
        local: string;
        valor: number;
        tipo: string;
    }[];
}

export function CardMovimentosFinanc({ movimentacoes }: MovimentosFinancProps) {
    return (
        <Card className="flex flex-col min-w-[55rem]">
            <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Movimentações Recentes</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-xs">Data</TableHead>
                            <TableHead className="text-xs">Descrição</TableHead>
                            <TableHead className="text-xs">Local</TableHead>
                            <TableHead className="text-xs text-right">Valor</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {movimentacoes.slice(-5).map((mov) => (
                            <TableRow key={mov.id}>
                                <TableCell className="text-xs py-1">{mov.data}</TableCell>
                                <TableCell className="text-xs py-1">{mov.descricao}</TableCell>
                                <TableCell className="text-xs py-1">{mov.local}</TableCell>
                                <TableCell className={`text-xs py-1 text-right ${mov.tipo === "Entrada" ? "text-green-500" : "text-red-500"}`}>
                                    {mov.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
} 