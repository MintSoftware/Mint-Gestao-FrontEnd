import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { useCadastroLocalViewModel } from "../pageViewModel";

export function Endereco() {
    const {
        cep,
        setCep,
        estado,
        setEstado,
        cidade,
        setCidade,
        bairro,
        setBairro,
        rua,
        setRua,
        complemento,
        setComplemento
    } = useCadastroLocalViewModel();
    
    return (
        <TabsContent value="endereco" className="space-y-4">
            <Input placeholder="CEP" id="cep" name="cep" value={cep} onChange={(event) => setCep(event.target.value)} required />
            <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Estado" id="estado" name="estado" value={estado} onChange={(event) => setEstado(event.target.value)} required />
                <Input placeholder="Cidade" id="cidade" name="cidade" value={cidade} onChange={(event) => setCidade(event.target.value)} required />
            </div>
            <Input placeholder="Bairro" id="bairro" name="bairro" value={bairro} onChange={(event) => setBairro(event.target.value)} required />
            <Input placeholder="Rua" id="rua" name="rua" value={rua} onChange={(event) => setRua(event.target.value)} required />
            <Input placeholder="Complemento" id="complemento" name="complemento" value={complemento} onChange={(event) => setComplemento(event.target.value)} required />
        </TabsContent>
    );
}