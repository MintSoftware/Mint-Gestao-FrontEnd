import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CalendarDaysIcon, CalendarIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "lucide-react"
import { useState } from "react"

export default function Mensal2() {
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
    const [events, /*setEvents*/] = useState([
        { date: "2024-08-10", title: "Team Meeting", time: "2:00 PM" },
        { date: "2024-08-10", title: "Dentist Appointment", time: "9:30 AM" },
        { date: "2024-08-15", title: "Vacation Planning", time: "7:00 PM" },
        { date: "2024-08-20", title: "Lunch with Friends", time: "12:00 PM" },
        { date: "2024-08-20", title: "Movie Night", time: "8:00 PM" },
    ])
    const handleDateClick = (date: any) => {
        setSelectedDate(date);
    }
    return (
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
                        <Button variant="ghost" size="icon" className="">
                            <PlusIcon className="h-5 w-5" />
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
                <ScrollArea className="h-[44rem] w-full">
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
                                            <div className="flex items-center justify-between">
                                                <div></div>
                                                <div className={`text-sm font-medium ${new Date().getDate() === i + 1 &&
                                                    new Date().getMonth() === currentDate.getMonth() &&
                                                    new Date().getFullYear() === currentDate.getFullYear() ? "text-foreground" : "text-foreground"
                                                    }`}>{((i + 1) < 10) ? '0' + (i + 1) : i + 1}
                                                </div>
                                                <div>
                                                    {new Date().getDate() === i + 1 &&
                                                        new Date().getMonth() === currentDate.getMonth() &&
                                                        new Date().getFullYear() === currentDate.getFullYear() &&
                                                        <div className="w-3 h-3 rounded-full bg-primary" />}
                                                    {events.filter(
                                                        (event) =>
                                                            event.date ===
                                                            new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1).toISOString().slice(0, 10),
                                                    ).length > 0}
                                                </div>
                                            </div>
                                            <div className="flex flex-col h-full justify-end py-6">
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
            </div>
        </div>
    );
}