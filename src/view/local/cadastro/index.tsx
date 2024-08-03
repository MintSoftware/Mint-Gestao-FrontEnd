import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Api from "@/infra/api";
import { useState } from "react";
import { toast } from "sonner";

const CadastroLocal = () => {
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [diasFuncionamento, setDiasFuncionamento] = useState("");
    const [complemento, setComplemento] = useState("");
    const [horarioAbertura, setHorarioAbertura] = useState("");
    const [horarioFechamento, setHorarioFechamento] = useState("");
    const [observacao, setObservacao] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const dto = {
        nome,
        status: 1,
        endereco,
        diasFuncionamento,
        complemento,
        horarioAbertura,
        horarioFechamento,
        observacao
    }

    const salvar = async () => {
        toast.promise(Api.post("gestao/local", dto).then(() => {
            toast.success("Local cadastrado com sucesso!");
            setIsDialogOpen(false);
        }).catch(() => {
            toast.error("Erro ao cadastrar local!");
        }), {
            loading: "Cadastrando...",
        });
    }
    
    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
                    <Button variant="default" className="ml-[10%]">Novo local</Button>
                </DialogTrigger>
                <DialogContent onInteractOutside={(evento) => evento.preventDefault()} className="sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Novo Local</DialogTitle>
                        <DialogDescription>Insira as informações do local para salvá-las.</DialogDescription>
                    </DialogHeader>
                    <CardContent className="space-y-4 w-[100%]">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome</Label>
                                <Input onChange={(e) => setNome(e.target.value)} className="w-[300px]" id="name" placeholder="Digite o nome do local" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Endereço</Label>
                                <Input onChange={(e) => setEndereco(e.target.value)} className="w-[300px]" id="address" placeholder="Digite o endereço do local" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="cnpj">Dias funcionamento</Label>
                                <Input onChange={(e) => setDiasFuncionamento(e.target.value)} className="w-[300px]" id="cnpj" placeholder="Informe os dias de funcionamento" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cnpj">Complemento</Label>
                                <Input onChange={(e) => setComplemento(e.target.value)} className="w-[300px]" id="cnpj" placeholder="Digite o complemento" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="dob">Horario de Abertura</Label>
                                <Input onChange={(e) => setHorarioAbertura(e.target.value)} className="w-[300px] fill-white stroke-white" id="dob" type="time" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dob">Horario de Fechamento</Label>
                                <Input onChange={(e) => setHorarioFechamento(e.target.value)} className="w-[300px] fill-white stroke-white" id="dob" type="time" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="observation">Observação</Label>
                            <Textarea onChange={(e) => setObservacao(e.target.value)} className="h-[100px]" id="observation" placeholder="Digite uma observação sobre o local" />
                        </div>
                    </CardContent>
                    <DialogFooter>
                        <div className="flex justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant="outline">Fechar</Button>
                            </DialogClose>
                            <Button onClick={salvar}>Salvar</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CadastroLocal;