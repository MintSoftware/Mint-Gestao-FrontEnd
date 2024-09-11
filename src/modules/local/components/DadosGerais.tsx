import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { InputBase } from "@/core/input/base";

interface DadosGeraisProps {
    formData: any;
    setFormData: (data: any) => void;
    errors: any;
    diasDaSemana: string[];
    handleModificarDia: (day: string) => void;
}

export function DadosGerais({ formData, setFormData, errors, diasDaSemana, handleModificarDia }: DadosGeraisProps) {
    return (
        <TabsContent value="dados-gerais" className="space-y-4">
            <div className="space-y-2">
                <Label>Dias de Funcionamento</Label>
                <div className="flex flex-wrap gap-4">
                    {diasDaSemana.map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                            <Checkbox
                                id={day}
                                checked={formData.diasFuncionamento.includes(day)}
                                onCheckedChange={() => handleModificarDia(day)}
                            />
                            <Label htmlFor={day}>{day}</Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="nome">Nome do Local</Label>
                <Input
                    placeholder="Nome do Local"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={(event) =>
                        setFormData({ ...formData, nome: event.target.value })
                    }
                    required
                />
                {errors.nome && <Label className="text-red-500">{errors.nome._errors[0]}</Label>}
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="horarioAbertura">Abertura</Label>
                    <InputBase
                        type="time"
                        placeholder="Horário de Abertura"
                        id="horarioAbertura"
                        name="horarioAbertura"
                        value={formData.horarioAbertura}
                        onChange={(value) => setFormData({ ...formData, horarioAbertura: value })}
                    />
                    {errors.horarioAbertura && <Label className="text-red-500">{errors.horarioAbertura._errors[0]}</Label>}
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="horarioFechamento">Fechamento</Label>
                    <InputBase
                        type="time"
                        placeholder="Horário de Fechamento"
                        id="horarioFechamento"
                        name="horarioFechamento"
                        value={formData.horarioFechamento}
                        onChange={(value) => setFormData({ ...formData, horarioFechamento: value })}
                    />
                    {errors.horarioFechamento && <Label className="text-red-500">{errors.horarioFechamento._errors[0]}</Label>}
                </div>

                <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="valorHora">Valor da Hora</Label>
                    <InputBase
                        type="valores"
                        className="w-full"
                        value={formData.valorHora}
                        onChange={(value) => setFormData({ ...formData, valorHora: value })}
                    />
                    {errors.valorHora && <Label className="text-red-500">{errors.valorHora._errors[0]}</Label>}
                </div>
            </div>

            <div className="flex flex-col w-full gap-2 h-[8rem]">
                <Label htmlFor="observacao">Observação</Label>
                <Textarea
                    className="h-full"
                    placeholder="Observação"
                    id="observacao"
                    name="observacao"
                    value={formData.observacao}
                    onChange={(event) =>
                        setFormData({ ...formData, observacao: event.target.value })
                    }
                />
                {errors.observacao && <Label className="text-red-500">{errors.observacao._errors[0]}</Label>}
            </div>
        </TabsContent>
    );
}
