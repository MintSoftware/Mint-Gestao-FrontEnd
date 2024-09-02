import { useState } from "react";
import { toast } from "sonner";
import { DadosGerais } from "./components/dadosgerais";
import { Endereco } from "./components/endereco";
import { Imagens } from "./components/imagens";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function RegistrarLocal() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        diasFuncionamento: {
            segunda: false,
            terca: false,
            quarta: false,
            quinta: false,
            sexta: false,
            sabado: false,
            domingo: false
        },
        horarioAbertura: '',
        horarioFechamento: '',
        valorHora: '',
        observacao: '',
        cep: '',
        estado: '',
        cidade: '',
        bairro: '',
        rua: '',
        complemento: '',
    });

    const [images, setImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCheckboxChange = (day: string) => {
        setFormData(prevData => ({
            ...prevData,
            diasFuncionamento: {
                ...prevData.diasFuncionamento,
                [day]: !prevData.diasFuncionamento[day as keyof typeof prevData.diasFuncionamento]
            }
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map(file => URL.createObjectURL(file));
            setImages(prevImages => [...prevImages, ...newImages]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form data submitted:', { ...formData, images });
        toast.success('Local registrado com sucesso!');
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
                <Button variant="default" className="">Novo local</Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(evento) => evento.preventDefault()} className="sm:max-w-[34rem] sm:h-[39rem]">
                <div className=" bg-background rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-6 text-center">Registrar Novo Local</h1>
                    <form onSubmit={handleSubmit}>
                        <Tabs defaultValue="dados-gerais" className="space-y-4 h-[31rem]">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="dados-gerais">Dados Gerais</TabsTrigger>
                                <TabsTrigger value="endereco">Endereço</TabsTrigger>
                                <TabsTrigger value="imagens">Imagens</TabsTrigger>
                            </TabsList>
                            <DadosGerais
                                formData={formData}
                                handleChange={handleChange}
                                handleCheckboxChange={handleCheckboxChange}
                            />
                            <Endereco formData={formData} handleChange={handleChange} />
                            <Imagens
                                images={images}
                                currentImageIndex={currentImageIndex}
                                handleImageUpload={handleImageUpload}
                                setCurrentImageIndex={setCurrentImageIndex}
                            />
                        </Tabs>
                        <div className="flex w-full justify-end">
                            <Button type="submit">Registrar</Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}