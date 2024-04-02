import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CadastroLocal = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
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
                                <Input className="w-[300px]" id="name" placeholder="Digite o nome do local" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Endereço</Label>
                                <Input className="w-[300px]" id="address" placeholder="Digite o endereço do local" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="cnpj">Dias funcionamento</Label>
                                <Input className="w-[300px]" id="cnpj" placeholder="Digite o complemento" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cnpj">Complemento</Label>
                                <Input className="w-[300px]" id="cnpj" placeholder="Digite os dias de funcionamento" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="dob">Horario de Abertura</Label>
                                <Input className="w-[300px] fill-white stroke-white" id="dob" type="time" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dob">Horario de Fechamento</Label>
                                <Input className="w-[300px] fill-white stroke-white" id="dob" type="time" />
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

export default CadastroLocal;