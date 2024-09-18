import Api from "@/infra/api"
import { Evento } from "@/types/Evento"
import { Local } from "@/types/Local"
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
                new Date(evento.horainicio).getDate() ===
                new Date(date).getDate() &&
                new Date(evento.horainicio).getMonth() ===
                new Date(date).getMonth() &&
                new Date(evento.horainicio).getFullYear() ===
                new Date(date).getFullYear()
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
        buscarLocais
    }
}