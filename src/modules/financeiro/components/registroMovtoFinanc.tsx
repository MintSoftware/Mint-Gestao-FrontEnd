import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CardCadastroMovtoFinancProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (field: string, value: string) => void;
    novoMovimento: {
        data: string;
        descricao: string;
        tipo: string;
        valor: number;
        local: string;
        hora: string;
    };
    locaisUnicos: string[];
}

export function CardCadastroMovtoFinanc({ handleSubmit, handleInputChange, handleSelectChange, novoMovimento, locaisUnicos }: CardCadastroMovtoFinancProps) {
    return (
        <Card className="flex flex-col min-w-[55rem]">
            <CardHeader>
                <CardTitle>Registrar Novo Movimento</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="data">Data</Label>
                        <Input id="data" name="data" type="date" value={novoMovimento.data} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="descricao">Descrição</Label>
                        <Input id="descricao" name="descricao" value={novoMovimento.descricao} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tipo">Tipo</Label>
                        <Select name="tipo" value={novoMovimento.tipo} onValueChange={(value) => handleSelectChange("tipo", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Entrada">Entrada</SelectItem>
                                <SelectItem value="Saída">Saída</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="valor">Valor</Label>
                        <Input id="valor" name="valor" type="number" value={novoMovimento.valor} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="local">Local</Label>
                        <Select name="local" value={novoMovimento.local} onValueChange={(value) => handleSelectChange("local", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione o local" />
                            </SelectTrigger>
                            <SelectContent>
                                {locaisUnicos.map(local => (
                                    <SelectItem key={local} value={local}>{local}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="hora">Hora</Label>
                        <Input id="hora" name="hora" type="time" value={novoMovimento.hora} onChange={handleInputChange} required />
                    </div>
                    <Button type="submit" className="col-span-2">Registrar Movimento</Button>
                </form>
            </CardContent>
        </Card>
    )
}