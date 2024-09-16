import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardTotalEntradasProps {
    totalSaidas: number;
}

export function CardTotalSaidas({ totalSaidas }: CardTotalEntradasProps) {
    return (
        <Card className="col-span-4 flex flex-col justify-center items-center">
            <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Total de Saídas</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-red-500">{totalSaidas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
            </CardContent>
        </Card>
    )
}