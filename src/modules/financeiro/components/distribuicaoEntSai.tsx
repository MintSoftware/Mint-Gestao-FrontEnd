import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface CardDistribuicaoEntSaiProps {
    dadosTipoMovimentacao: { nome: string, valor: number }[];
}

export function CardDistribuicaoEntSai({ dadosTipoMovimentacao }: CardDistribuicaoEntSaiProps) {
    return (
        <Card className="col-span-6">
            <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Distribuição de Entradas e Saídas</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={dadosTipoMovimentacao}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill={`var(--primary)`}
                            dataKey="valor"
                            label={({ nome, percent }) => `${nome} ${(percent * 100).toFixed(0)}%`}
                        >
                            {dadosTipoMovimentacao.map((index: any) => (
                                <Cell key={`cell-${index}`} fill={`var(--primary)`} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}