import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CadastroCliente = () => {
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
                                <Input className="w-[300px]" id="name" placeholder="Digite o nome do cliente" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input className="w-[300px]" type="email" id="email" placeholder="Digite o email do cliente" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Telefone</Label>
                                <Input className="w-[300px]" id="phone" placeholder="Digite o telefone do cliente" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Endereço</Label>
                                <Input className="w-[300px]" id="address" placeholder="Digite o endereço do cliente" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="dob">Data de Nascimento</Label>
                                <Input className="w-[300px] fill-white stroke-white" id="dob" placeholder="Digite a data de nascimento do cliente" type="date" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cnpj">CPF/CNPJ</Label>
                                <Input className="w-[300px]" id="cnpj" placeholder="Digite o CPF/CNPJ do cliente" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="observation">Observação</Label>
                            <Textarea className="h-[100px]" id="observation" placeholder="Digite uma observação sobre o cliente" />
                        </div>
                    </CardContent>
                    <DialogFooter>
                        <div className="flex justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant="outline">Fechar</Button>
                            </DialogClose>
                            <Button>Salvar</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CadastroCliente;