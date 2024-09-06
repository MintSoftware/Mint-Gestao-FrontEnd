import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { InputBase } from "@/core/input/base";
import { useCadastroLocalViewModel } from "../pageViewModel";

export function DadosGerais() {
    const {
        diasDaSemana,
        diasFuncionamento,
        nome,
        setNome,
        observacao,
        setObservacao,
        valorHora,
        setValorHora,
        handleModificarDia,
        horarioAbertura,
        setHorarioAbertura,
        horarioFechamento,
        setHorarioFechamento,
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
                        <div className="flex items-center w-full gap-2 justify-center">
                            {diasDaSemana.map((day) => (
                                <div key={day} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={day}
                                        checked={diasFuncionamento.includes(day)}
                                        onCheckedChange={() => handleModificarDia(day)}
                                    />
                                    <Label htmlFor={day}>{day}</Label>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="horarioAbertura">Hora Abertura</Label>
                    <InputBase type="time" placeholder="Horário de Abertura" id="horarioAbertura" name="horarioAbertura" value={horarioAbertura} onChange={setHorarioAbertura} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="horarioFechamento">Hora Fechamento</Label>
                    <InputBase type="time" placeholder="Horário de Fechamento" id="horarioFechamento" name="horarioFechamento" value={horarioFechamento} onChange={setHorarioFechamento} />
                </div>
            </div>
            <div className="flex flex-col w-full gap-2">
                <Label htmlFor="valorHora">Valor da Hora</Label>
                <InputBase type="valores" className="w-full" value={valorHora} onChange={setValorHora} />
            </div>
            <div className="flex flex-col w-full gap-2">
                <Label htmlFor="observacao">Observação</Label>
                <Textarea className="h-[13rem]" placeholder="Observação" id="observacao" name="observacao" value={observacao} onChange={(event) => setObservacao(event.target.value)} />
            </div>
        </TabsContent>
    );
}
