import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface CardLocaisMaisFatProps {
    dadosLocais: { nome: string, valor: number }[];
}

export function CardLocaisMaisFat({ dadosLocais }: CardLocaisMaisFatProps) {
    return (
        <Card className="col-span-6">
            <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Locais que Mais Faturaram</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dadosLocais}>
                        <XAxis dataKey="nome" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="valor" fill={`var(--primary)`} name="Faturamento" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}