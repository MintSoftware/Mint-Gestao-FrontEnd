import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
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
                    <ScrollArea className="h-[21rem] p-4">
                    <TableHeader>
                        <TableRow>
                                <TableHead>Data</TableHead>
                                <TableHead>Descrição</TableHead>
                                <TableHead>Local</TableHead>
                                <TableHead className="text-right">Valor</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {movimentacoes.slice(-5).map((mov) => (
                            <TableRow key={mov.id}>
                                <TableCell><Label>{mov.data}</Label></TableCell>
                                <TableCell><Label>{mov.descricao}</Label></TableCell>
                                <TableCell><Label>{mov.local}</Label></TableCell>
                                <TableCell className={`text-right ${mov.tipo === "Entrada" ? "text-green-500" : "text-red-500"}`}>
                                    <Label>{mov.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Label>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </ScrollArea>
                </Table>
            </CardContent>
        </Card>
    )
} 