import { DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAgendaContext } from "@/providers/AgendaProvider"
import { CadastroEvento } from "./cadastro/CadastroEvento"

export default function Mensal() {

    const {
        currentDate,
        setSelectedDate,
        daysOfWeek,
        daysInMonth,
        firstDayOfMonth,
        selectedDate,
        handleDateClick,
        feriados,
        eventos,
        eventosDia,
        loadingEventos,
    } = useAgendaContext();

    return (
        <div className='flex h-full w-full'>
            <div className='flex items-center h-full w-full justify-between'>
                <div className="flex h-[46.5rem] w-full rounded-[20px]">
                    <div className="flex-1 p-2 rounded-[20px] justify-center items-center">
                        <div className="grid grid-cols-7 mb-4 mt-3">
                            {daysOfWeek.map((day, index) => (
                                <div key={index} className="flex justify-center w-full text-center text-sm font-medium text-muted-foreground">
                                    {day}
                                </div>
                            ))}
                        </div>
                        <ScrollArea className="desktop:h-[43rem] notebook:h-[29rem] w-full">
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
                                                        className={`relative rounded-[15px] border cursor-pointer transition-colors bg-background hover:bg-muted/50 h-[8rem]`}
                                                        onClick={() =>
                                                            handleDateClick(
                                                                new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 2).toISOString().slice(0, 10),
                                                            )
                                                        }
                                                    >
                                                        <div className="flex items-center justify-end gap-1">
                                                            <div className="w-3 h-3"></div>
                                                            <div className={`absolute left-0 top-1 w-full items-center text-sm font-medium ${new Date().getDate() === i + 1 &&
                                                                new Date().getMonth() === currentDate.getMonth() &&
                                                                new Date().getFullYear() === currentDate.getFullYear() ? "text-foreground" : "text-foreground"
                                                                }`}>{((i + 1) < 10) ? '0' + (i + 1) : i + 1}
                                                            </div>
                                                            {new Date().getDate() === i + 1 &&
                                                                new Date().getMonth() === currentDate.getMonth() &&
                                                                new Date().getFullYear() === currentDate.getFullYear() &&
                                                                <div className="absolute top-2 right-3 w-3 h-3 rounded-full bg-green-500" />
                                                            }
                                                            {feriados.isHoliday(new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)) &&
                                                                <div className="absolute top-2 right-3 w-3 h-3 rounded-full bg-purple-500" />
                                                            }
                                                            {eventos.filter(
                                                                (evento) =>
                                                                    new Date(evento.horainicio) ===
                                                                    new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
                                                            ).length > 0}
                                                            <div></div>
                                                        </div>
                                                        <div className="flex flex-col h-[7rem] justify-end p-1">
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
                                                                    <div key={index} className="flex text-sm text-muted-foreground bg-gray-300 dark:bg-secondary rounded mt-1">
                                                                        <div className="flex w-full h-5 mx-2 overflow-hidden justify-center items-center">
                                                                            <Label>{evento.nome} - {new Date(evento.horainicio).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })} - {new Date(evento.horafim).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}</Label>
                                                                        </div>
                                                                    </div>
                                                                )) : <div>
                                                                <Skeleton className="h-[6rem] notebook:w-[11.2rem] desktop:w-[14.5rem]" />
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
                                {<CadastroEvento data={selectedDate} onClose={() => setSelectedDate(undefined)} eventos={eventosDia} />}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div >
        </div >
    );
}