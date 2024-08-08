import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Holidays from 'date-holidays'
import { CalendarDaysIcon, CalendarIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useState } from "react"

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
    const [selectedDate, setSelectedDate] = useState(null)
    const feriados = new Holidays('BR');
    const [events, /*setEvents*/] = useState([
        { date: "2024-08-10", title: "Team Meeting", time: "2:00 PM" },
        { date: "2024-08-10", title: "Dentist Appointment", time: "9:30 AM" },
        { date: "2024-08-15", title: "Vacation Planning", time: "7:00 PM" },
        { date: "2024-08-20", title: "Lunch with Friends", time: "12:00 PM" },
        { date: "2024-08-20", title: "Movie Night", time: "8:00 PM" },
        { date: "2024-08-07", title: "Client Meeting", time: "10:00 AM" },
    ])
    const handleDateClick = (date: any) => {
        setSelectedDate(date);
    }
    return (
        <div className='flex h-full w-full'>
            <div className='flex items-center h-full w-full justify-between'>
                <div className="flex h-[50rem] w-full rounded-[20px]">
                    <div className="flex-1 p-2 rounded-[20px] justify-center items-center">
                        <header className="sticky mt-8 top-0 z-20 flex h-16 w-full items-center justify-between bg-background border rounded-[20px] px-4 shadow-sm sm:px-6">
                            <div>
                                <Button variant="ghost" size="icon" onClick={handleToday}>
                                    <CalendarIcon className="h-5 w-5" />
                                    <span className="sr-only">Hoje</span>
                                </Button>
                            </div>
                            <div className="flex items-center gap-4">
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
                                <div className="flex items-center gap-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="flex items-center gap-2">
                                                <CalendarDaysIcon className="h-5 w-5" />
                                                <span>Mês</span>
                                                <ChevronDownIcon className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Dia</DropdownMenuItem>
                                            <DropdownMenuItem>Semana</DropdownMenuItem>
                                            <DropdownMenuItem>Mês</DropdownMenuItem>
                                            <DropdownMenuItem>Ano</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <Button variant="ghost" className="cursor-pointer">
                                    <Label className="cursor-pointer">Novo Evento</Label>
                                </Button>
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
                                    <div key={i} className="flex justify-center relative rounded-[15px] border cursor-pointer transition-colors hover:bg-muted/50 p-2 h-[8rem]">
                                        {new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, daysInMonth - firstDayOfMonth + i + 1).getDate()}
                                    </div>
                                ))}
                                {Array.from({ length: daysInMonth }, (_, i) => (
                                    <TooltipProvider key={i + 1}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div
                                                    className={`relative rounded-[15px] border cursor-pointer transition-colors hover:bg-muted/50 p-2 h-[8rem] ${selectedDate ===
                                                        new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1).toISOString().slice(0, 10)
                                                        ? "bg-secondary text-primary"
                                                        : new Date().getDate() === i + 1 &&
                                                            new Date().getMonth() === currentDate.getMonth() &&
                                                            new Date().getFullYear() === currentDate.getFullYear()
                                                            ? "bg-background text-foreground"
                                                            : "bg-background text-foreground"
                                                        }`}
                                                    onClick={() =>
                                                        handleDateClick(
                                                            new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1).toISOString().slice(0, 10),
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
                                                        {events.filter(
                                                            (event) =>
                                                                event.date ===
                                                                new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1).toISOString().slice(0, 10),
                                                        ).length > 0}
                                                        <div></div>
                                                    </div>
                                                    <div className="flex absolute top-2 left-2 flex-col h-[7rem] w-[14rem] justify-end">
                                                        {events
                                                            .filter(
                                                                (event) =>
                                                                    event.date ===
                                                                    new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1).toISOString().slice(0, 10),
                                                            )
                                                            .map((event, index) => (
                                                                <div key={index} className="flex text-sm text-white bg-secondary rounded mt-1">
                                                                    <div className="flex h-5 mx-2 overflow-hidden">
                                                                        {event.title} - {event.time}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                    </div>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-muted">
                                                {(events.filter(
                                                    (event) =>
                                                        event.date ===
                                                        new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1).toISOString().slice(0, 10),
                                                ).length > 0) ? events
                                                    .filter(
                                                        (event) =>
                                                            event.date ===
                                                            new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1).toISOString().slice(0, 10),
                                                    )
                                                    .map((event, index) => (
                                                        <div key={index} className="text-sm text-muted-foreground">
                                                            {event.time} - {event.title}
                                                        </div>
                                                    )) : (
                                                    <div className="text-sm text-muted-foreground">Sem Eventos</div>
                                                )}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="flex h-[1.5rem]">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className=" cursor-pointer ml-4 flex w-[7rem] justify-start items-center w-full h-full gap-2">
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
    );
}