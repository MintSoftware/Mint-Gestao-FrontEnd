import { calcularHoras, dateParaString, stringParaDate } from "@/core/horas/Horas";
import Api from "@/infra/api";
import { useAgendaContext } from "@/providers/AgendaProvider";
import { Local } from "@/types/Local";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function useCadastroEventoController(onClose: () => void) {
    const [loadingLocais, setLoadingLocais] = useState(false);
    const [locais, setLocais] = useState<Local[]>();
    const [localSelecionado, setlocalSelecionado] = useState<Local>();
    const [openFiltroLocal, setOpenFiltroLocal] = useState(false);
    const [valorHora, setValorHora] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);

    const {
        buscarEventos,
        localSelecionadoFiltro,
        handleLocalSelecionadoFiltro,
        refreshTimeLine
    } = useAgendaContext();


    const FormSchema = z.object({
        local: z.string().refine(value => value.length > 0, {
            message: 'Local é obrigatório',
        }),
        diaEvento: z.date().nullable().refine(value => value !== null, {
            message: 'Data é obrigatória',
        }).refine(value => value > new Date(0, 0, 0, 0, 0), {
            message: 'Data deve ser maior que a data atual',
        }),
        nome: z.string().refine(value => value.length > 0, {
            message: 'Nome é obrigatório',
        }),
        sobrenome: z.string().refine(value => value.length > 0, {
            message: 'Sobrenome é obrigatório',
        }),
        telefone: z.string().refine(value => value.length === 11, {
            message: 'Telefone deve conter 11 dígitos',
        }),
        email: z.string().email(),
        horainicio: z.date().refine(value => value.getHours() > 0, {
            message: 'Hora de início inválida',
        }),
        horafim: z.date().refine(value => value.getHours() > 0, {
            message: 'Hora de fim inválida',
        })
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            local: '',
            diaEvento: undefined,
            nome: '',
            sobrenome: '',
            telefone: '',
            email: '',
            horainicio: new Date(0, 0, 0, 0, 0, 0),
            horafim: new Date(0, 0, 0, 0, 0, 0),
        }
    })

    let horasTimeLine = Array.from({ length: 24 }, (_, i) => i)

    if (localSelecionado || localSelecionadoFiltro) {
        const localUtilizado = (localSelecionado) ? localSelecionado : localSelecionadoFiltro;
        if (localUtilizado) {
            horasTimeLine = calcularHoras(stringParaDate(localUtilizado.horarioAbertura), stringParaDate(localUtilizado.horarioFechamento));
        }
    }

    const calcularTamanhoPelaQuantHora = (quantidadeHoras: number) => {
        return quantidadeHoras * 3.4
    }

    const buscarLocais = async () => {
        try {
            setLoadingLocais(true);
            const { data } = await Api.get('gestao/local');
            setLocais(data);
            setLoadingLocais(false);
        } catch (error) {
            setLoadingLocais(false);
            toast.error('Erro ao buscar locais');
        }
    };

    const limparDados = () => {
        form.setValue('local', '');
        form.setValue('nome', '');
        form.setValue('sobrenome', '');
        form.setValue('telefone', '');
        form.setValue('email', '');
        form.setValue('horainicio', new Date(0, 0, 0, 0, 0, 0));
        form.setValue('horafim', new Date(0, 0, 0, 0, 0, 0));
        form.reset();

        setlocalSelecionado(undefined);
        form.clearErrors();
    }

    const limparDadosEFechar = () => {
        limparDados();
        fechar();
    }

    const fechar = () => {
        onClose();
    }

    const handlelocalSelecionado = (local: Local) => {

        if (localSelecionado == local) {
            setlocalSelecionado(undefined);
            setOpenFiltroLocal(false);
            return;
        }

        setlocalSelecionado(local);
        setOpenFiltroLocal(false);
    }

    useEffect(() => {
        calcularValorHora();
    }, [localSelecionado]);

    useEffect(() => {
        calcularValorTotal();
    }, [form.getFieldState('horainicio'), form.getFieldState('horafim')]);

    const calcularValorHora = () => {
        const horainicio = form.getValues('horainicio'),
            horafim = form.getValues('horafim');

        setValorHora(localSelecionado?.valorHora || 0);

        if (!horainicio || !horafim || horafim.getHours() <= horainicio.getHours()) return;

        const quantidadeHoras = horafim.getHours() - horainicio.getHours();
        setValorTotal((localSelecionado?.valorHora || 0) * quantidadeHoras);
    }

    const calcularValorTotal = () => {
        const horainicio = form.getValues('horainicio'),
            horafim = form.getValues('horafim');

        if (horafim.getHours() <= horainicio.getHours()) return;

        const quantidadeHoras = new Date(horafim).getHours() - new Date(horainicio).getHours();
        setValorTotal((localSelecionado?.valorHora || 0) * quantidadeHoras);
    }

    const salvarEvento = (values: z.infer<typeof FormSchema>) => {
        const evento = {
            nome: values.nome,
            sobrenome: values.sobrenome,
            email: values.email,
            telefone: values.telefone,
            valortotal: valorTotal,
            valorhora: valorHora,
            horainicio: dateParaString(values.horainicio),
            horafim: dateParaString(values.horafim),
            dataevento: values.diaEvento,
            local: localSelecionado
        }

        toast.promise(Api.post("gestao/evento", evento, {}).then(async () => {
            toast.success("Evento Salvo com sucesso!");
            refreshTimeLine(values.diaEvento);
            limparDadosEFechar();
            if (localSelecionadoFiltro && localSelecionado) {
                buscarEventos(localSelecionadoFiltro.id);
                handleLocalSelecionadoFiltro(localSelecionado);
            }
        }).catch((error) => {
            toast.error(error.response.data);
        }), {
            loading: "Salvando...",
        });
    }

    const cancelarEvento = (id: string) => {
        toast.promise(Api.delete(`gestao/evento/${id}`, {}).then(async () => {
            toast.success("Evento cancelado com sucesso!");
            refreshTimeLine(form.getValues('diaEvento'));
            if (localSelecionadoFiltro && localSelecionado) {
                buscarEventos(localSelecionadoFiltro.id);
                handleLocalSelecionadoFiltro(localSelecionado);
            }
        }).catch((error) => {
            toast.error(
                error.response.data
                    .join(';\n\n'),
                {
                    style: {
                        whiteSpace: 'pre-line',
                        padding: '10px',
                        borderRadius: '8px',
                        fontSize: '14px',
                    },
                }
            );
        }), {
            loading: "Cancelando...",
        });
    }

    const listaHora: Date[] = [
        new Date(1970, 0, 1, 0, 0, 0),
        new Date(1971, 0, 1, 1, 0, 0),
        new Date(1972, 0, 1, 2, 0, 0),
        new Date(1973, 0, 1, 3, 0, 0),
        new Date(1974, 0, 1, 4, 0, 0),
        new Date(1975, 0, 1, 5, 0, 0),
        new Date(1976, 0, 1, 6, 0, 0),
        new Date(1977, 0, 1, 7, 0, 0),
        new Date(1978, 0, 1, 8, 0, 0)
    ]

    return {
        loadingLocais,
        locais,
        localSelecionado,
        openFiltroLocal,
        valorHora,
        valorTotal,
        form,
        horasTimeLine,
        listaHora,
        buscarLocais,
        handlelocalSelecionado,
        limparDados,
        limparDadosEFechar,
        fechar,
        salvarEvento,
        calcularValorHora,
        calcularValorTotal,
        calcularTamanhoPelaQuantHora,
        setOpenFiltroLocal,
        setlocalSelecionado,
        cancelarEvento
    }
}