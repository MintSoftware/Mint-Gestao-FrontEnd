import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useState } from "react"

export default function Mensal2() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const handlePreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }
    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
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
            <div className="flex-1 p-2 rounded-[20px]">
                <header className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 justify-center w-full">
                        <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
                            <ChevronLeftIcon className="w-5 h-5" />
                        </Button>
                        <div className="flex items-center gap-4 w-[158px] justify-center flex">
                            <div className="text-2xl font-bold items-center justify-center flex">
                                <Label className="text-xl">{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</Label>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                            <ChevronRightIcon className="w-5 h-5" />
                        </Button>
                    </div>
                </header>
                    <div className="grid grid-cols-7 mb-4">
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
                            <div
                                key={i + 1}
                                className={`relative rounded-[15px] border cursor-pointer transition-colors hover:bg-muted/50 p-2 h-[8rem] ${selectedDate ===
                                    new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1).toISOString().slice(0, 10)
                                    ? "bg-secondary text-primary"
                                    : new Date().getDate() === i + 1 &&
                                        new Date().getMonth() === currentDate.getMonth() &&
                                        new Date().getFullYear() === currentDate.getFullYear()
                                        ? "bg-background text-secondary-foreground"
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
                                        new Date().getFullYear() === currentDate.getFullYear() ? "text-primary" : "text-foreground"
                                        }`}>{((i + 1) < 10) ? '0' + (i + 1) : i + 1}</div>
                                    <div>
                                        {events.filter(
                                            (event) =>
                                                event.date ===
                                                new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1).toISOString().slice(0, 10),
                                        ).length > 0 && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className="w-3 h-3 rounded-full bg-primary" />
                                                        </TooltipTrigger>
                                                        <TooltipContent className="bg-muted">
                                                            {events
                                                                .filter(
                                                                    (event) =>
                                                                        event.date ===
                                                                        new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
                                                                            .toISOString()
                                                                            .slice(0, 10),
                                                                )
                                                                .map((event, index) => (
                                                                    <div key={index} className="text-sm text-muted-foreground">
                                                                        {event.title} - {event.time}
                                                                    </div>
                                                                ))}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
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
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}