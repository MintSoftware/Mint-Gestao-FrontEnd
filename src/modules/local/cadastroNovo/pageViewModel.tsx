import { useState } from "react";
import { toast } from "sonner";

export function useCadastroLocalViewModel() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [nome, setNome] = useState("");
    const [cep, setCep] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [rua, setRua] = useState("");
    const [diasFuncionamento, setDiasFuncionamento] = useState<string[]>([]);
    const [complemento, setComplemento] = useState("");
    const [horarioAbertura, setHorarioAbertura] = useState<Date>();
    const [horarioFechamento, setHorarioFechamento] = useState<Date>();
    const [observacao, setObservacao] = useState("");
    const [valorHora, setValorHora] = useState(0);


    const [images, setImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map(file => URL.createObjectURL(file));
            setImages(prevImages => [...prevImages, ...newImages]);
        }
    };

    const adicionarDia = (dia: string) => {
        diasFuncionamento.push(dia);
        setDiasFuncionamento(diasFuncionamento);
    }

    const removerDia = (dia: string) => {
        const index = diasFuncionamento.indexOf(dia);
        diasFuncionamento.splice(index, 1);
        setDiasFuncionamento(diasFuncionamento);
    }

    const diaSelecionado = (dia: string) => {
        return diasFuncionamento.includes(dia);
    }

    const salvarLocal = (e : any) => {
        e.preventDefault();
        console.log('Form data submitted:', { images });
        toast.success('Local registrado com sucesso!');
    };

    return {
        isDialogOpen,
        setIsDialogOpen,
        nome,
        setNome,
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
        diasFuncionamento,
        setDiasFuncionamento,
        complemento,
        setComplemento,
        horarioAbertura,
        setHorarioAbertura,
        horarioFechamento,
        setHorarioFechamento,
        observacao,
        setObservacao,
        valorHora,
        setValorHora,
        images,
        setImages,
        currentImageIndex,
        setCurrentImageIndex,
        handleImageUpload,
        adicionarDia,
        removerDia,
        diaSelecionado,
        salvarLocal
    };
}