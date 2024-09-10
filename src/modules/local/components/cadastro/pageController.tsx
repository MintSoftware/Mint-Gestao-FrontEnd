import Api from "@/infra/api";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    cep: z.string().min(8, "CEP deve ter 8 dígitos"),
    estado: z.string().min(2, "Estado é obrigatório"),
    cidade: z.string().min(1, "Cidade é obrigatória"),
    bairro: z.string().min(1, "Bairro é obrigatório"),
    rua: z.string().min(1, "Rua é obrigatória"),
    diasFuncionamento: z.array(z.string()).min(1, "Selecione pelo menos um dia de funcionamento"),
    complemento: z.string().optional(),
    horarioAbertura: z.date({ required_error: "Horário de abertura é obrigatório" }).refine(data => data > new Date(0, 0, 0, 0, 0, 0), "Horário de abertura é obrigatório"),
    horarioFechamento: z.date({ required_error: "Horário de fechamento é obrigatório" }).refine(data => data > new Date(0, 0, 0, 0, 0, 0), "Horário de fechamento deve ser maior que o horário de abertura"),
    observacao: z.string().optional(),
    valorHora: z.number().min(1, "Valor por hora deve ser maior que zero"),
    images: z.array(z.string())
});

export function useCadastroLocalViewModel() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [formData, setFormData] = useState({
        nome: "",
        cep: "",
        estado: "",
        cidade: "",
        bairro: "",
        rua: "",
        diasFuncionamento: [] as string[],
        complemento: "",
        horarioAbertura: new Date(0, 0, 0, 0, 0, 0),
        horarioFechamento: new Date(0, 0, 0, 0, 0, 0),
        observacao: "",
        valorHora: 0,
        images: [] as string[]
    });

    const [errors, setErrors] = useState<z.infer<typeof schema>>({} as any);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map(file => URL.createObjectURL(file));
            setFormData(prevData => ({
                ...prevData,
                images: [...prevData.images, ...newImages]
            }));
        }
    };

    const adicionarDia = (dia: string) => {
        setFormData(prevData => ({
            ...prevData,
            diasFuncionamento: prevData.diasFuncionamento.includes(dia)
                ? prevData.diasFuncionamento.filter(d => d !== dia)
                : [...prevData.diasFuncionamento, dia]
        }));
    };

    const removerDia = (dia: string) => {
        setFormData(prevData => ({
            ...prevData,
            diasFuncionamento: prevData.diasFuncionamento.filter(d => d !== dia)
        }));
    };

    const diaSelecionado = (dia: string) => formData.diasFuncionamento.includes(dia);

    const salvarLocal = async () => {
        const result = schema.safeParse(formData);

        if (!result.success) {
            const errorMessages = result.error.format();
            setErrors(errorMessages as any);
            toast.error("Verifique os erros no formulário.");
            return;
        }

        const dto = {
            nome: formData.nome,
            cep: formData.cep,
            estado: formData.estado,
            cidade: formData.cidade,
            bairro: formData.bairro,
            rua: formData.rua,
            diasFuncionamento: formData.diasFuncionamento.join(","),
            complemento: formData.complemento,
            horarioAbertura: formData.horarioAbertura,
            horarioFechamento: formData.horarioFechamento,
            observacao: formData.observacao,
            valorHora: formData.valorHora,
            //images: formData.images,
            status: 1
        }

        toast.promise(Api.post("gestao/local", dto).then(() => {
            toast.success("Local cadastrado com sucesso!");
            setIsDialogOpen(false);
            resetForm();
        }).catch(() => {
            toast.error("Erro ao cadastrar local.");
        }), {
            loading: "Cadastrando local..."
        });
    };

    const resetForm = () => {
        setFormData({
            nome: "",
            cep: "",
            estado: "",
            cidade: "",
            bairro: "",
            rua: "",
            diasFuncionamento: [],
            complemento: "",
            horarioAbertura: new Date(),
            horarioFechamento: new Date(),
            observacao: "",
            valorHora: 0,
            images: []
        });
        setErrors({} as any);
    };

    const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

    const handleModificarDia = (day: string) => {
        setFormData(prev =>
            prev.diasFuncionamento.includes(day)
                ? { ...prev, diasFuncionamento: prev.diasFuncionamento.filter(d => d !== day) }
                : { ...prev, diasFuncionamento: [...prev.diasFuncionamento, day] }
        );
    };

    return {
        formData,
        setFormData,
        errors,
        handleModificarDia,
        resetForm,
        diasDaSemana,
        isDialogOpen,
        setIsDialogOpen,
        adicionarDia,
        removerDia,
        diaSelecionado,
        salvarLocal,
        handleImageUpload,
        currentImageIndex,
        setCurrentImageIndex
    };
}
