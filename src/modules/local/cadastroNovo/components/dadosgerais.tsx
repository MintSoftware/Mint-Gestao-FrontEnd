import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { InputBase } from "@/core/input/base";
import { useCadastroLocalViewModel } from "../pageViewModel";

export function DadosGerais() {

    const {
        adicionarDia,
        diaSelecionado,
        nome,
        setNome,
        horarioAbertura,
        setHorarioAbertura,
        horarioFechamento,
        setHorarioFechamento,
        observacao,
        setObservacao,
        valorHora,
        setValorHora
    } = useCadastroLocalViewModel();

    return (
        <TabsContent value="dados-gerais" className="space-y-4">
            <div className="flex flex-col gap-2">
            <Label htmlFor="nome">Nome do Local</Label>
            <Input placeholder="Nome do Local" id="nome" name="nome" value={nome} onChange={(event) => setNome(event.target.value)} required />
            </div>
            <div className="space-y-2">
                <Label>Dias de Funcionamento</Label>
                <div className="flex flex-wrap gap-4">
                    <Checkbox id="domingo" name="domingo" checked={diaSelecionado('domingo')} onChange={() => adicionarDia('domingo')} />
                    <Label htmlFor="domingo">Dom</Label>
                    <Checkbox id="segunda" name="segunda" checked={diaSelecionado('segunda')} onChange={() => adicionarDia('segunda')} />
                    <Label htmlFor="segunda">Seg</Label>
                    <Checkbox id="terca" name="terca" checked={diaSelecionado('terca')} onChange={() => adicionarDia('terca')} />
                    <Label htmlFor="terca">Ter</Label>
                    <Checkbox id="quarta" name="quarta" checked={diaSelecionado('quarta')} onChange={() => adicionarDia('quarta')} />
                    <Label htmlFor="quarta">Qua</Label>
                    <Checkbox id="quinta" name="quinta" checked={diaSelecionado('quinta')} onChange={() => adicionarDia('quinta')} />
                    <Label htmlFor="quinta">Qui</Label>
                    <Checkbox id="sexta" name="sexta" checked={diaSelecionado('sexta')} onChange={() => adicionarDia('sexta')} />
                    <Label htmlFor="sexta">Sex</Label>
                    <Checkbox id="sabado" name="sabado" checked={diaSelecionado('sabado')} onChange={() => adicionarDia('sabado')} />
                    <Label htmlFor="sabado">Sab</Label>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
                    <Label htmlFor="endereco">Hora Abertura</Label>
                    <Input placeholder="Horário de Abertura" id="horarioAbertura" name="horarioAbertura" type="time" />
                </div>
                <div className="flex flex-col gap-2">
                <Label htmlFor="endereco">Hora Fechamento</Label>
                    <Input placeholder="Horário de Fechamento" id="horarioFechamento" name="horarioFechamento" type="time" />
                </div>
            </div>
            <div className="flex flex-col w-full gap-2">
                <Label htmlFor="valorHora">Valor da Hora</Label>
                <InputBase type="valores" className="w-full" value={valorHora} onChange={setValorHora} />
            </div>
            <div className="flex flex-col w-full gap-2">
                <Label htmlFor="valorHora">Observação</Label>
                <Textarea className="h-[13rem]" placeholder="Observação" id="observacao" name="observacao" value={observacao} onChange={(event) => setObservacao(event.target.value)} />
            </div>
        </TabsContent>
    );
}