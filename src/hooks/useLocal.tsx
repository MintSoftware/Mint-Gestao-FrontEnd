import Api from "@/infra/api";
import { Local } from "@/types/Local";
import xlsx, { IJsonSheet } from "json-as-xlsx";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
    id: z.string().optional(),
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

export function useLocal() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [recarrecarLocais, setRecarrecarLocais] = useState(false);

    const recarregarListaLocais = () => {
        setRecarrecarLocais(!recarrecarLocais);
    }

    const [formData, setFormData] = useState({
        id: "",
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
            recarregarListaLocais();
        }).catch(() => {
            toast.error("Erro ao cadastrar local.");
        }), {
            loading: "Cadastrando local..."
        });
    };

    const resetForm = () => {
        setFormData({
            id: "",
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

    const [locais, setLocais] = useState<Local[]>([]);
    const [loading, setLoading] = useState(false);

    const recuperarDadosParaPdf = () => document.getElementById('root');

    const baixarExcel = (dados: any) => {
        const colunas: IJsonSheet[] = [
            {
                sheet: 'Locais',
                columns: [
                    { label: 'ID', value: 'id' },
                    { label: 'Nome', value: 'nome' },
                    { label: "Status", value: "status" },
                    { label: 'Endereço', value: 'endereco' },
                    { label: 'Complemento', value: 'complemento' },
                    { label: 'Observação', value: 'observacao' },
                    { label: 'Hora de Abertura', value: 'horaAbertura' },
                    { label: 'Hora de Fechamento', value: 'horaFechamento' },
                    { label: 'Dias de Funcionamento', value: 'diasFuncionamento' },
                ],
                content: dados
            }
        ];

        const configuracao = {
            fileName: "Locais"
        }

        xlsx(colunas, configuracao)
    }

    const ver = (local: Local) => {
        console.log("Ver", local)
    }

    const inativar = (local: Local) => async () => {
        await Api.put(`gestao/local/${local.id}/inativar`)
    }

    const ativar = (local: Local) => async () => {
        await Api.put(`gestao/local/${local.id}/ativar`)
    }

    const editarLocal = async () => {
        const result = schema.safeParse(formData);

        if (!result.success) {
            const errorMessages = result.error.format();
            setErrors(errorMessages as any);
            toast.error("Verifique os erros no formulário.");
            return;
        }

        const dto = {
            id: formData.id,
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

        toast.promise(Api.put(`gestao/local/${formData.id}`, dto).then(() => {
            toast.success("Local editado com sucesso!");
            setIsDialogOpen(false);
            resetForm();
            recarregarListaLocais();
        }).catch(() => {
            toast.error("Erro ao editar o local.");
        }), {
            loading: "Salvando as mudanças..."
        });
    }

    const buscarLocais = async () => {
        try {
            setLoading(true);
            const { data } = await Api.get('gestao/local');
            setLocais(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(`Ocorreu um erro ao buscar os locais: ${error}`);
        }
    };

    return {
        buscarLocais,
        isDialogOpen,
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
        adicionarDia,
        removerDia,
        diaSelecionado,
        locais,
        loading,
        ver,
        inativar,
        ativar,
        editarLocal,
        recuperarDadosParaPdf,
        baixarExcel,
        recarregarListaLocais,
        recarrecarLocais,
        setRecarrecarLocais
    }
}