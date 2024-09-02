import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export function DadosGerais({ formData, handleChange }: any) {

    const diasFuncionamento = [];

    const adicionarDia = (dia: string) => {
        diasFuncionamento.push(dia);
    }

    return (
        <TabsContent value="dados-gerais" className="space-y-4">
            <Input placeholder="Nome do Local" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
            <div className="space-y-2">
                <Label>Dias de Funcionamento</Label>
                <div className="flex flex-wrap gap-4">
                    <Checkbox id="domingo" name="domingo" checked={formData.diasFuncionamento.domingo} onChange={() => adicionarDia('domingo')} />
                    <Label htmlFor="domingo">Dom</Label>
                    <Checkbox id="segunda" name="segunda" checked={formData.diasFuncionamento.segunda} onChange={() => adicionarDia('segunda')} />
                    <Label htmlFor="segunda">Seg</Label>
                    <Checkbox id="terca" name="terca" checked={formData.diasFuncionamento.terca} onChange={() => adicionarDia('terca')} />
                    <Label htmlFor="terca">Ter</Label>
                    <Checkbox id="quarta" name="quarta" checked={formData.diasFuncionamento.quarta} onChange={() => adicionarDia('quarta')} />
                    <Label htmlFor="quarta">Qua</Label>
                    <Checkbox id="quinta" name="quinta" checked={formData.diasFuncionamento.quinta} onChange={() => adicionarDia('quinta')} />
                    <Label htmlFor="quinta">Qui</Label>
                    <Checkbox id="sexta" name="sexta" checked={formData.diasFuncionamento.sexta} onChange={() => adicionarDia('sexta')} />
                    <Label htmlFor="sexta">Sex</Label>
                    <Checkbox id="sabado" name="sabado" checked={formData.diasFuncionamento.sabado} onChange={() => adicionarDia('sabado')} />
                    <Label htmlFor="sabado">Sab</Label>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Horário de Abertura" id="horarioAbertura" name="horarioAbertura" type="time" value={formData.horarioAbertura} onChange={handleChange} required />
                <Input placeholder="Horário de Fechamento" id="horarioFechamento" name="horarioFechamento" type="time" value={formData.horarioFechamento} onChange={handleChange} required />
            </div>
            <Input placeholder="Valor por Hora (R$)" id="valorHora" name="valorHora" type="number" step="0.01" min="0" value={formData.valorHora} onChange={handleChange} required />
            <Textarea className="h-[13rem]" placeholder="Observação" id="observacao" name="observacao" value={formData.observacao} onChange={handleChange} rows={4} />
        </TabsContent>
    );
}