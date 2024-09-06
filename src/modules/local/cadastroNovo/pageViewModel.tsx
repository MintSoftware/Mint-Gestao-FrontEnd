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
        setDiasFuncionamento(prevDias =>
            prevDias.includes(dia)
                ? prevDias.filter(d => d !== dia) // Remove o dia se já estiver selecionado
                : [...prevDias, dia] // Adiciona o dia se não estiver selecionado
        );
    };

    const removerDia = (dia: string) => {
        setDiasFuncionamento(prevDias => prevDias.filter(d => d !== dia));
    };

    const diaSelecionado = (dia: string) => diasFuncionamento.includes(dia);

    const salvarLocal = (e: any) => {
        e.preventDefault();

        const dto = {
            nome,
            cep,
            estado,
            cidade,
            bairro,
            rua,
            diasFuncionamento,
            complemento,
            horarioAbertura,
            horarioFechamento,
            observacao,
            valorHora,
            images
        };

        debugger

        console.log('Form data submitted:', { images });
        toast.success('Local registrado com sucesso!');
    };

    const diasDaSemana = [
        'Dom',
        'Seg',
        'Ter',
        'Qua',
        'Qui',
        'Sex',
        'Sab',
    ]

    const handleModificarDia = (day: string) => {
        setDiasFuncionamento(prev =>
            prev.includes(day)
                ? prev.filter(d => d !== day)
                : [...prev, day]
        )
    }

    return {
        handleModificarDia,
        diasDaSemana,
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
        adicionarDia,
        removerDia,
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
        diaSelecionado,
        salvarLocal
    };
}