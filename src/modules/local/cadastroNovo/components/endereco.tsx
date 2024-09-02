import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";

export function Endereco({ formData, handleChange }: any) {
    return (
        <TabsContent value="endereco" className="space-y-4">
            <Input placeholder="CEP" id="cep" name="cep" value={formData.cep} onChange={handleChange} required />
            <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Estado" id="estado" name="estado" value={formData.estado} onChange={handleChange} required />
                <Input placeholder="Cidade" id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} required />
            </div>
            <Input placeholder="Bairro" id="bairro" name="bairro" value={formData.bairro} onChange={handleChange} required />
            <Input placeholder="Rua" id="rua" name="rua" value={formData.rua} onChange={handleChange} required />
            <Input placeholder="Complemento" id="complemento" name="complemento" value={formData.complemento} onChange={handleChange} />
        </TabsContent>
    );
}