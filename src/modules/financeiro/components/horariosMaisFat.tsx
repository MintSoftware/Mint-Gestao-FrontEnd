import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface CardHorarioMaisFatProps {
    dadosLocais: { nome: string }[];
    dadosHorarios: { hora: string, valor: number }[];
    localSelecionado: string;
    setLocalSelecionado: (value: string) => void;
}

export function CardHorarioMaisFat({ dadosLocais, dadosHorarios, localSelecionado, setLocalSelecionado }: CardHorarioMaisFatProps) {
    return (
        <Card className="col-span-12">
            <CardHeader className="py-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">Horários que Mais Faturaram</CardTitle>
                <Select value={localSelecionado} onValueChange={setLocalSelecionado}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione o local" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Todos">Todos os locais</SelectItem>
                        {dadosLocais.map(local => (
                            <SelectItem key={local.nome} value={local.nome}>{local.nome}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={dadosHorarios}>
                        <XAxis dataKey="hora" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="valor" name="Faturamento" stroke={`var(--primary)`} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}