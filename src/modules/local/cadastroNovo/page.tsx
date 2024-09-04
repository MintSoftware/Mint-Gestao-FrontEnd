import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DadosGerais } from "./components/dadosgerais";
import { Endereco } from "./components/endereco";
import { Imagens } from "./components/imagens";
import { useCadastroLocalViewModel } from "./pageViewModel";

export default function RegistrarLocal() {

    const {
        isDialogOpen,
        setIsDialogOpen,
        salvarLocal,
    } = useCadastroLocalViewModel();

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
                <Button variant="default" className="">Novo local</Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(evento) => evento.preventDefault()} className="sm:max-w-[30rem] sm:h-[44rem]">
                <div className=" bg-background rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-6 text-center">Registrar Novo Local</h1>
                    <Tabs defaultValue="dados-gerais" className="space-y-4 h-[36rem]">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
                            <TabsTrigger value="endereco">Endereço</TabsTrigger>
                            <TabsTrigger value="imagens">Imagens</TabsTrigger>
                        </TabsList>
                        <DadosGerais />
                        <Endereco />
                        <Imagens />
                    </Tabs>
                    <div className="flex w-full justify-end gap-2">
                        <DialogClose>
                            <Button variant="secondary">Cancelar</Button>
                        </DialogClose>
                        <Button onClick={salvarLocal}>Registrar</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}