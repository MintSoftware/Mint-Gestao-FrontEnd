import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


interface CardSaldoTotalProps {
    saldoTotal: number;
}

export function CardSaldoTotal({ saldoTotal }: CardSaldoTotalProps) {
    return (
        <Card className="col-span-4 flex flex-col justify-center items-center">
            <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{saldoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
            </CardContent>
        </Card>
    )
}