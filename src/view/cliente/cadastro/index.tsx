import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Api from "@/infra/api";
import { useState } from "react";

const CadastroCliente = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [cpf, setCpf] = useState("");
    const [observacao, setObservacao] = useState("");

    const dto = {
        nome,
        status: 1,
        email,
        telefone,
        endereco,
        dataNascimento,
        cpf,
        observacao
    }

    const salvar = async () => {
        await Api.post("gestao/cliente", dto);
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="default">Novo cliente</Button>
                </DialogTrigger>
                <DialogContent onInteractOutside={(evento) => evento.preventDefault()} className="sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Novo Cliente</DialogTitle>
                        <DialogDescription>Insira as informações do cliente para salvá-las.</DialogDescription>
                    </DialogHeader>
                    <CardContent className="space-y-4 w-[100%]">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome</Label>
                                <Input onChange={(e) => setNome(e.target.value)} className="w-[300px]" id="name" placeholder="Digite o nome do cliente" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input onChange={(e) => setEmail(e.target.value)} className="w-[300px]" type="email" id="email" placeholder="Digite o email do cliente" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Telefone</Label>
                                <Input onChange={(e) => setTelefone(e.target.value)} className="w-[300px]" id="phone" placeholder="Digite o telefone do cliente" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Endereço</Label>
                                <Input onChange={(e) => setEndereco(e.target.value)} className="w-[300px]" id="address" placeholder="Digite o endereço do cliente" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="dob">Data de Nascimento</Label>
                                <Input onChange={(e) => setDataNascimento(e.target.value)} className="w-[300px] fill-white stroke-white" id="dob" placeholder="Digite a data de nascimento do cliente" type="date" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cnpj">CPF/CNPJ</Label>
                                <Input onChange={(e) => setCpf(e.target.value)} className="w-[300px]" id="cnpj" placeholder="Digite o CPF/CNPJ do cliente" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="observation">Observação</Label>
                            <Textarea onChange={(e) => setObservacao(e.target.value)} className="h-[100px]" id="observation" placeholder="Digite uma observação sobre o cliente" />
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

export default CadastroCliente;