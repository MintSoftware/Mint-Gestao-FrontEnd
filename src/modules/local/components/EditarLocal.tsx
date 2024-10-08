import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { stringParaDate } from "@/core/horas/Horas.tsx";
import { useLocalContext } from "@/providers/LocalProvider.tsx";
import { Local } from "@/types/Local.ts";
import { Row } from "@tanstack/react-table";
import { PencilIcon } from "lucide-react";
import { DadosGerais } from "./DadosGerais.tsx";
import { Endereco } from "./Endereco.tsx";
import { Imagens } from "./Imagens.tsx";

interface EditarLocalProps {
    local: Row<Local>;
}

export default function EditarLocal({ local }: EditarLocalProps) {

    const {
        setIsDialogOpen,
        editarLocal,
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
        <div>
            <DialogTrigger asChild onClick={() => {
                setIsDialogOpen(true)
                setFormData({
                    ...local.original,
                    diasFuncionamento: local.original.diasFuncionamento.split(","),
                    horarioAbertura: stringParaDate(local.original.horarioAbertura),
                    horarioFechamento: stringParaDate(local.original.horarioFechamento),
                    images: []
                })
            }}>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <PencilIcon className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(evento) => evento.preventDefault()} className="flex items-center justify-center">
                <div className=" bg-background">
                    <DialogTitle className="text-2xl font-bold mb-6 text-center">Editar Local</DialogTitle>
                    <Tabs defaultValue="dados-gerais" className="flex flex-col h-[30rem] w-[27rem]">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
                            <TabsTrigger value="endereco">Endereço</TabsTrigger>
                            <TabsTrigger value="imagens">Imagens</TabsTrigger>
                        </TabsList>

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
                        <Button onClick={editarLocal}>Salvar</Button>
                    </div>
                </div>
            </DialogContent>
        </div>
    );
}
