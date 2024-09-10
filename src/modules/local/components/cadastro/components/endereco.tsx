import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";

interface EnderecoProps {
    formData: any;
    setFormData: (data: any) => void;
    errors: any;
}

export function Endereco({ formData, setFormData, errors }: EnderecoProps) {
    return (
        <TabsContent value="endereco" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="estado">Estado</Label>
                    <Input
                        placeholder="Estado"
                        id="estado"
                        name="estado"
                        value={formData.estado}
                        onChange={(event) => setFormData({ ...formData, estado: event.target.value })}
                        required
                    />
                    {errors.estado && <Label className="text-red-500">{errors.estado._errors[0]}</Label>}
                </div>

                <div>
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input
                        placeholder="Cidade"
                        id="cidade"
                        name="cidade"
                        value={formData.cidade}
                        onChange={(event) => setFormData({ ...formData, cidade: event.target.value })}
                        required
                    />
                    {errors.cidade && <Label className="text-red-500">{errors.cidade._errors[0]}</Label>}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="cep">CEP</Label>
                    <Input
                        placeholder="CEP"
                        id="cep"
                        name="cep"
                        value={formData.cep}
                        onChange={(event) => setFormData({ ...formData, cep: event.target.value })}
                        required
                    />
                    {errors.cep && <Label className="text-red-500">{errors.cep._errors[0]}</Label>}
                </div>
                <div>
                    <Label htmlFor="bairro">Bairro</Label>
                    <Input
                        placeholder="Bairro"
                        id="bairro"
                        name="bairro"
                        value={formData.bairro}
                        onChange={(event) => setFormData({ ...formData, bairro: event.target.value })}
                        required
                    />
                    {errors.bairro && <Label className="text-red-500">{errors.bairro._errors[0]}</Label>}
                </div>
            </div>
            <div>
                <Label htmlFor="rua">Rua</Label>
                <Input
                    placeholder="Rua"
                    id="rua"
                    name="rua"
                    value={formData.rua}
                    onChange={(event) => setFormData({ ...formData, rua: event.target.value })}
                    required
                />
                {errors.rua && <Label className="text-red-500">{errors.rua._errors[0]}</Label>}
            </div>
            <div>
                <Label htmlFor="complemento">Complemento</Label>
                <Input
                    placeholder="Complemento"
                    id="complemento"
                    name="complemento"
                    value={formData.complemento}
                    onChange={(event) => setFormData({ ...formData, complemento: event.target.value })}
                    required
                />
                {errors.complemento && <Label className="text-red-500">{errors.complemento._errors[0]}</Label>}
            </div>
        </TabsContent>
    );
}
