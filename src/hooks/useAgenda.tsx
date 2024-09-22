import { stringParaDate } from "@/core/horas/Horas"
import Api from "@/infra/api"
import { Evento } from "@/types/Evento"
import { Local } from "@/types/Local"
import { parseISO } from "date-fns"
import Holidays from "date-holidays"
import { useState } from "react"
import { toast } from "sonner"

export function useAgenda() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const handlePreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }
    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }
    const handleToday = () => {
        setCurrentDate(new Date())
    }
    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
    const [selectedDate, setSelectedDate] = useState(undefined)
    const feriados = new Holidays('BR');
    const [lotados, setLotados] = useState<Date[]>([]);
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [eventosDia, setEventosDia] = useState<Evento[]>([]);
    const [loadingEventos, setLoadingEventos] = useState(false);
    const [loadingLocais, setLoadingLocais] = useState(false);
    const [locais, setLocais] = useState<Local[]>();
    const [localSelecionadoFiltro, setLocalSelecionadoFiltro] = useState<Local>();
    const [openFiltroLocal, setOpenFiltroLocal] = useState(false);

    const handleDateClick = (date: any) => {
        setSelectedDate(date);
        setEventosDia(eventos.filter(
            (evento) =>
                parseISO(evento.dataevento.toString()).getDate() ===
                new Date(date).getDate() &&
                parseISO(evento.dataevento.toString()).getMonth() ===
                new Date(date).getMonth() &&
                parseISO(evento.dataevento.toString()).getFullYear() ===
                new Date(date).getFullYear()
        ));
    }

    const refreshTimeLine = (date: Date) => {
        setEventosDia(eventos.filter(
            (evento) =>
                 parseISO(evento.dataevento.toString()).getDate() ===
                date.getDate() &&
                 parseISO(evento.dataevento.toString()).getMonth() ===
                date.getMonth() &&
                 parseISO(evento.dataevento.toString()).getFullYear() ===
                date.getFullYear()
        ));
    }


    const handleLocalSelecionadoFiltro = (local: Local) => {

        if (localSelecionadoFiltro == local) {
            setLocalSelecionadoFiltro(undefined);
            setEventos([]);
            setOpenFiltroLocal(false);
            return;
        }

        setLocalSelecionadoFiltro(local);
        setOpenFiltroLocal(false);
        buscarEventos(local.id);
    }

    const buscarEventos = async (id: string) => {
        try {
            setLoadingEventos(true);
            const { data } = await Api.get(`gestao/evento/buscarporlocal/${id}`);
            setEventos(data);
            verificaDiasLotados();
            setLoadingEventos(false);
        } catch (error) {
            setLoadingEventos(false);
            toast.error('Erro ao buscar eventos');
        }
    };

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

    function gerarHorariosDia(horaAbertura: number, horaFechamento: number) {
        return Array.from({ length: horaFechamento - horaAbertura }, (_, index) => ({
            horaInicio: horaAbertura + index,
            horaFim: horaAbertura + index + 1,
        }));
    }
    
    function verificarHorariosLotados(horariosDia: { horaInicio: number; horaFim: number }[], eventosDoDia: Evento[]) {
        for (const horario of horariosDia) {
            const horarioOcupado = eventosDoDia.some((evento) => {
                const horaInicioEvento = stringParaDate(evento.horainicio.toString()).getHours();
                const horaFimEvento = stringParaDate(evento.horafim.toString()).getHours();
    
                // Verifica se o evento cobre o horário
                return horaInicioEvento < horario.horaFim && horaFimEvento > horario.horaInicio;
            });
    
            // Se algum horário não estiver ocupado, retorna false
            if (!horarioOcupado) {
                return false;
            }
        }
    
        // Se todos os horários estão ocupados, retorna true
        return true;
    }
    
    function verificaDiasLotados() {
        if (!localSelecionadoFiltro) {
            return;
        }
    
        const diaAbertura = stringParaDate(localSelecionadoFiltro.horarioAbertura).getHours();
        const diaFechamento = stringParaDate(localSelecionadoFiltro.horarioFechamento).getHours();
        const horariosDia = gerarHorariosDia(diaAbertura, diaFechamento);
        
        // Filtra todos os eventos do mês
        const eventosDoMes = eventos.filter((evento) => {
            const eventoDate = parseISO(evento.dataevento.toString());
            return (
                eventoDate.getMonth() === currentDate.getMonth() &&
                eventoDate.getFullYear() === currentDate.getFullYear()
            );
        });
    
        const diasLotados = [];
    
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            
            // Filtra os eventos do dia atual
            const eventosDoDia = eventosDoMes.filter((evento) => {
                const eventoDate = parseISO(evento.dataevento.toString());
                return (
                    eventoDate.getDate() === i &&
                    eventoDate.getMonth() === currentDate.getMonth() &&
                    eventoDate.getFullYear() === currentDate.getFullYear()
                );
            });
    
            const horariosLotados = verificarHorariosLotados(horariosDia, eventosDoDia);
            if (horariosLotados) {
                diasLotados.push(date);
            }
        }
        setLotados(diasLotados);
    }    

    return {
        currentDate,
        setSelectedDate,
        handlePreviousMonth,
        handleNextMonth,
        handleToday,
        daysOfWeek,
        daysInMonth,
        firstDayOfMonth,
        selectedDate,
        handleDateClick,
        feriados,
        lotados,
        eventos,
        eventosDia,
        loadingEventos,
        loadingLocais,
        locais,
        localSelecionadoFiltro,
        openFiltroLocal,
        setOpenFiltroLocal,
        handleLocalSelecionadoFiltro,
        buscarEventos,
        buscarLocais,
        refreshTimeLine
    }
}