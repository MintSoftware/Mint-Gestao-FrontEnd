import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface CardEvolucaoSaldoProps {
    movimentacoes: { data: string, valor: number }[];
}

export function CardEvolucaoSaldo({ movimentacoes }: CardEvolucaoSaldoProps) {
    return (
        <Card className="col-span-12">
            <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Evolução do Saldo</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={movimentacoes}>
                        <XAxis dataKey="data" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="valor" name="Saldo" stroke={`var(--primary)`} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}