import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Api from "@/infra/api"
import { cn } from "@/lib/utils"
import { Evento } from "@/types/Evento"
import { Local } from "@/types/Local"
import Holidays from 'date-holidays'
import { CalendarIcon, CheckIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, FilterIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { Dialog, DialogTrigger } from "../ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Skeleton } from "../ui/skeleton"
import { CadastroEvento } from "./cadastro/cadastroevento"

export default function Calendario() {
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

    return (
        <Dialog>
            <div className='flex h-full w-full'>
                <div className='flex items-center h-full w-full justify-between'>
                    <div className="flex h-[50rem] w-full rounded-[20px]">
                        <div className="flex-1 p-2 rounded-[20px] justify-center items-center">
                            <header className="sticky mt-8 top-0 z-20 flex h-16 w-full items-center justify-between bg-background border rounded-[20px] px-4 shadow-sm sm:px-6">
                                <div className="flex gap-5 items-center">
                                    <div>
                                        <Button variant="ghost" size="icon" onClick={handleToday}>
                                            <CalendarIcon className="h-5 w-5" />
                                            <span className="sr-only">Hoje</span>
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <Popover open={openFiltroLocal} onOpenChange={setOpenFiltroLocal}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        role="combobox"
                                                        aria-expanded={openFiltroLocal}
                                                        className="w-[20rem] justify-between p-5 border"
                                                        onClick={() => buscarLocais()}
                                                    >
                                                        <FilterIcon className="h-5 w-5" />
                                                        <Label className="text-muted-foreground">
                                                            {localSelecionadoFiltro?.nome
                                                                ? locais?.find((local) => local.id === localSelecionadoFiltro.id)?.nome
                                                                : "Selecione um local"}
                                                        </Label>
                                                        <ChevronDownIcon className='m-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200' style={{
                                                            transform: openFiltroLocal ? 'rotate(180deg)' : 'rotate(0deg)',
                                                        }} />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[20rem] p-0">
                                                    <Command>
                                                        {(loadingLocais) ? <></> :
                                                            <div>
                                                                <CommandInput placeholder="Busque o local aqui..." />
                                                                <CommandEmpty>
                                                                    <Label>Local não encontrado</Label>
                                                                </CommandEmpty>
                                                            </div>
                                                        }
                                                        <CommandGroup>
                                                            {(loadingLocais) ? <div className="flex flex-col gap-2">
                                                                <Skeleton className="h-[1.5rem] w-full" />
                                                                <Skeleton className="h-[1.5rem] w-full" />
                                                                <Skeleton className="h-[1.5rem] w-full" />
                                                                <Skeleton className="h-[1.5rem] w-full" />
                                                                <Skeleton className="h-[1.5rem] w-full" />
                                                                <Skeleton className="h-[1.5rem] w-full" />
                                                                <Skeleton className="h-[1.5rem] w-full" />
                                                                <Skeleton className="h-[1.5rem] w-full" />
                                                                <Skeleton className="h-[1.5rem] w-full" />
                                                            </div> :
                                                                locais?.map((local) => (
                                                                    <CommandList
                                                                        key={local.id}
                                                                        onClick={() => handleLocalSelecionadoFiltro(local)}
                                                                        className="flex cursor-pointer w-[20rem] bg-background hover:bg-muted/50"
                                                                    >
                                                                        <CommandItem className="flex w-[20rem] bg-background">
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    localSelecionadoFiltro?.id === local.id ? "opacity-100" : "opacity-0"
                                                                                )}
                                                                            />
                                                                            {local.nome}
                                                                        </CommandItem>
                                                                    </CommandList>
                                                                ))}
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute left-[40vw] flex items-center gap-4">
                                    <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
                                        <ChevronLeftIcon className="h-5 w-5" />
                                        <span className="sr-only">Anterior</span>
                                    </Button>
                                    <div className="text-lg font-medium w-[9rem] flex justify-center">
                                        {currentDate.toLocaleString("default", { month: "long" }).charAt(0).toUpperCase() + currentDate.toLocaleString("default", { month: "long" }).slice(1)} {currentDate.getFullYear()}
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                                        <ChevronRightIcon className="h-5 w-5" />
                                        <span className="sr-only">Próximo</span>
                                    </Button>
                                </div>
                                <div className="flex gap-2">
                                    <DialogTrigger asChild>
                                        <Button variant="ghost">Novo Evento</Button>
                                    </DialogTrigger>
                                </div>
                            </header>
                            <div className="grid grid-cols-7 mb-4 mt-3">
                                {daysOfWeek.map((day, index) => (
                                    <div key={index} className="flex justify-center w-full text-center text-sm font-medium text-muted-foreground">
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <ScrollArea className="h-[43rem] w-full">
                                <div className="grid grid-cols-7 gap-2 bg- p-3">
                                    {Array.from({ length: firstDayOfMonth }, (_, i) => (
                                        <div key={i} className="flex justify-center relative rounded-[15px] border cursor-not-allowed transition-colors hover:bg-muted/50 p-2 h-[8rem]">
                                            {new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, daysInMonth - firstDayOfMonth + i + 1).getDate()}
                                        </div>
                                    ))}
                                    {Array.from({ length: daysInMonth }, (_, i) => (
                                        <TooltipProvider key={i + 1}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <DialogTrigger>
                                                        <div
                                                            className={`relative rounded-[15px] border cursor-pointer transition-colors bg-background hover:bg-muted/50 p-2 h-[8rem]`}
                                                            onClick={() =>
                                                                handleDateClick(
                                                                    new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 2).toISOString().slice(0, 10),
                                                                )
                                                            }
                                                        >
                                                            <div className="flex items-center justify-end gap-1">
                                                                <div></div>
                                                                <div className={`absolute top-1 left-[7rem] text-sm font-medium ${new Date().getDate() === i + 1 &&
                                                                    new Date().getMonth() === currentDate.getMonth() &&
                                                                    new Date().getFullYear() === currentDate.getFullYear() ? "text-foreground" : "text-foreground"
                                                                    }`}>{((i + 1) < 10) ? '0' + (i + 1) : i + 1}
                                                                </div>
                                                                {new Date().getDate() === i + 1 &&
                                                                    new Date().getMonth() === currentDate.getMonth() &&
                                                                    new Date().getFullYear() === currentDate.getFullYear() &&
                                                                    <div className=" w-3 h-3 rounded-full bg-primary" />
                                                                }
                                                                {feriados.isHoliday(new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)) &&
                                                                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                                                                }
                                                                {eventos.filter(
                                                                    (evento) =>
                                                                        new Date(evento.horainicio) ===
                                                                        new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
                                                                ).length > 0}
                                                                <div></div>
                                                            </div>
                                                            <div className="flex absolute top-2 left-2 flex-col h-[7rem] w-[14rem] justify-end">
                                                                {!loadingEventos ? eventos
                                                                    .filter(
                                                                        (evento) =>
                                                                            new Date(evento.horainicio).getDate() ===
                                                                            new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1).getDate() &&
                                                                            new Date(evento.horainicio).getMonth() ===
                                                                            new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1).getMonth() &&
                                                                            new Date(evento.horainicio).getFullYear() ===
                                                                            new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1).getFullYear()
                                                                    )
                                                                    .map((evento, index) => (
                                                                        <div key={index} className="flex text-sm text-muted-foreground bg-secondary rounded mt-1">
                                                                            <div className="flex w-full h-5 mx-2 overflow-hidden justify-center items-center">
                                                                                <Label>{evento.nome} - {new Date(evento.horainicio).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })} - {new Date(evento.horafim).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}</Label>
                                                                            </div>
                                                                        </div>
                                                                    )) : <div>
                                                                    <Skeleton className="h-[6rem] w-[14rem]" />
                                                                </div>}
                                                            </div>
                                                        </div>
                                                    </DialogTrigger>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-muted">
                                                    {(eventos.filter(
                                                        (evento) =>
                                                            new Date(evento.horainicio).getDate() ===
                                                            new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1).getDate() &&
                                                            new Date(evento.horainicio).getMonth() ===
                                                            new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1).getMonth() &&
                                                            new Date(evento.horainicio).getFullYear() ===
                                                            new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1).getFullYear()
                                                    ).length > 0) ? eventos
                                                        .filter(
                                                            (evento) =>
                                                                new Date(evento.horainicio).getDate() ===
                                                                new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1).getDate() &&
                                                                new Date(evento.horainicio).getMonth() ===
                                                                new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1).getMonth() &&
                                                                new Date(evento.horainicio).getFullYear() ===
                                                                new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1).getFullYear()
                                                        )
                                                        .map((evento, index) => (
                                                            <div key={index} className="flex text-sm text-muted-foreground p-1 items-center justify-center">
                                                                <Label>{evento.nome} - {new Date(evento.horainicio).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })} - {new Date(evento.horafim).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}</Label>
                                                            </div>
                                                        )) : (
                                                        <div className="text-sm text-muted-foreground">Sem Eventos</div>
                                                    )}
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    ))}
                                    {<CadastroEvento data={selectedDate} onClose={() => setSelectedDate(undefined)} eventos={eventosDia}/>}
                                    {/* {<CadastroEventoTeste/>} */}
                                </div>
                            </ScrollArea>
                            <div className="flex h-[1.5rem]">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className=" cursor-pointer ml-4 flex w-[7rem] justify-start items-center h-full gap-2">
                                                <Label className="cursor-pointer text-xs items-center flex text-muted-foreground">Legenda:</Label>
                                                <div className="w-3 h-3 rounded-full bg-primary border" />
                                                <div className="w-3 h-3 rounded-full bg-purple-500 border" />
                                                <div className="w-3 h-3 rounded-full bg-red-500 border" />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-muted">
                                            <div className="text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <div className="w-3 h-3 rounded-full bg-primary" />
                                                    <div>Hoje</div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                                                    <div>Feriado</div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                                    <div>Lotado</div>
                                                </div>
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </Dialog>
    );
}