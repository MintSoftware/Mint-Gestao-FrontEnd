import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalContext } from "@/providers/LocalProvider.tsx";
import { DadosGerais } from "./DadosGerais.tsx";
import { Endereco } from "./Endereco.tsx";
import { Imagens } from "./Imagens.tsx";

export default function CadastroLocal() {

    const {
        setIsDialogOpen,
        salvarLocal,
        formData,
        setFormData,
        errors,
        handleImageUpload,
        currentImageIndex,
        setCurrentImageIndex,
        diasDaSemana,
        resetForm,
        handleModificarDia,
    } = useLocalContext();

    return (
        <Dialog>
            <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
                <Button variant="default" className="">Novo local</Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(evento) => evento.preventDefault()} className="flex items-center justify-center">
                <div className=" bg-background">
                    <DialogTitle className="text-2xl font-bold mb-6 text-center">Registrar Novo Local</DialogTitle>
                    <Tabs defaultValue="dados-gerais" className="flex flex-col h-[30rem] w-[27rem]">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
                            <TabsTrigger value="endereco">Endereço</TabsTrigger>
                            <TabsTrigger value="imagens">Imagens</TabsTrigger>
                        </TabsList>

                        {/* Passando os dados e handlers para cada componente */}
                        <DadosGerais
                            formData={formData}
                            setFormData={setFormData}
                            errors={errors}
                            diasDaSemana={diasDaSemana}
                            handleModificarDia={handleModificarDia}
                        />
                        <Endereco
                            formData={formData}
                            setFormData={setFormData}
                            errors={errors}
                        />
                        <Imagens
                            formData={formData}
                            setFormData={setFormData}
                            handleImageUpload={handleImageUpload}
                            currentImageIndex={currentImageIndex}
                            setCurrentImageIndex={setCurrentImageIndex}
                        />
                    </Tabs>

                    <div className="flex w-full justify-end gap-2">
                        <DialogClose>
                            <Button variant="secondary" onClick={() => {
                                setIsDialogOpen(false)
                                resetForm()
                            }}>Cancelar</Button>
                        </DialogClose>
                        <Button onClick={salvarLocal}>Registrar</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
