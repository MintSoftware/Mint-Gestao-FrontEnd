import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardTotalEntradasProps {
    totalEntradas: number;
}

export function CardTotalEntradas({ totalEntradas }: CardTotalEntradasProps) {
    return (
        <Card className="col-span-4 flex flex-col justify-center items-center">
            <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Total de Entradas</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-green-500">{totalEntradas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
            </CardContent>
        </Card>
    )
}