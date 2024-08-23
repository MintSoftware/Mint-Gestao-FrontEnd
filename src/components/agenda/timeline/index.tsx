import { Label } from "@/components/ui/label"
import { Evento } from "@/types/Evento"
import { Clock } from "lucide-react"

interface TimeLineProps {
    eventos?: Evento[]
}


export default function TimeLine({ eventos }: TimeLineProps) {

    const hours = Array.from({ length: 24 }, (_, i) => i)

    const getEventPosition = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number)
        return hours + minutes / 60
    }

    const getEventStyle = (start: string, end: string) => {
        const startPosition = getEventPosition(start)
        const endPosition = getEventPosition(end)
        const top = `${(startPosition % 1) * 100}%`
        const height = `${(endPosition - startPosition) * 100}%`
        return { top, height }
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="relative">
                <div className="absolute top-0 bottom-0 left-16 w-px bg-secondary"></div>
                {hours.map((hour) => {
                    const timeString = `${hour.toString().padStart(2, '0')}:00`
                    const hourEvents = eventos?.filter(evento =>
                        new Date(evento.horainicio).getHours() === hour
                    )

                    return (
                        <div key={hour} className="flex mb-4">
                            <div className="flex items-center w-16">
                                <div className="absolute left-16 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2"></div>
                                <Clock className="mr-1 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                                <span className="text-sm font-medium text-muted-foreground">{timeString}</span>
                            </div>
                            <div className="flex-grow ml-4 h-16 relative">
                                {hourEvents?.map(evento => {
                                    const style = getEventStyle(
                                        new Date(evento.horainicio).getHours().toString(),
                                        new Date(evento.horafim).getHours().toString()
                                    )
                                    return (
                                        <div
                                            key={evento.id}
                                            className={`bg-secondary absolute left-0 right-0 rounded-md p-2 text-xs overflow-hidden flex flex-col justify-between`}
                                            style={style}
                                        >
                                            <div>
                                                <Label className="text-muted-foreground">{evento.nome}</Label>
                                            </div>
                                            <div className="text-muted-foreground">
                                                <Label>{new Date(evento.horainicio).toLocaleTimeString()} - {new Date(evento.horafim).toLocaleTimeString()}</Label>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}