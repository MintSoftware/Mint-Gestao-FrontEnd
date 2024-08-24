import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Evento } from "@/types/Evento"
import { Clock, ClockIcon, FlagIcon, PhoneCallIcon } from "lucide-react"

interface TimeLineProps {
    eventos?: Evento[]
}


export default function TimeLine({ eventos }: TimeLineProps) {

    const hours = Array.from({ length: 24 }, (_, i) => i)

    const calcularTamanhoPelaQuantHora = (quantidadeHoras: number) => {
        return quantidadeHoras * 3.4
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
                        <div key={hour} className="flex">
                            <div className="flex items-center w-16">
                                <div className="absolute left-16 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2"></div>
                                <Clock className="mr-1 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                                <span className="text-sm font-medium text-muted-foreground">{timeString}</span>
                            </div>
                            <div className="flex-grow ml-4 h-14 relative top-7">
                                {hourEvents?.map(evento => {
                                    const quantidadeHoras = new Date(evento.horafim).getHours() - new Date(evento.horainicio).getHours();

                                    return (
                                        <div
                                            key={evento.id}
                                            className="bg-secondary relative left-0 right-0 rounded-md p-2 text-xs flex flex-col justify-between"
                                            style={{ height: `${calcularTamanhoPelaQuantHora(quantidadeHoras)}rem` }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="flex gap-2 mt-0.5 mr-4">
                                                    <ClockIcon className="h-4 w-4 opacity-70" />
                                                    <Label className="text-muted-foreground">{new Date(evento.horainicio).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}</Label>
                                                </div>
                                                <Avatar className="h-4 w-4">
                                                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${evento.nome} ${evento.sobrenome}`} />
                                                    <AvatarFallback>{evento.nome}{evento.sobrenome}</AvatarFallback>
                                                </Avatar>
                                                <Label className="text-muted-foreground truncate w-[10rem]">{evento.nome} {evento.sobrenome}</Label>
                                            </div>
                                            <div className="flex gap-2">
                                                <FlagIcon className="h-4 w-4 opacity-70" />
                                                <Label className="text-muted-foreground mr-4">{new Date(evento.horafim).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}</Label>
                                                <div className="flex gap-2">
                                                    <PhoneCallIcon className="h-4 w-4 opacity-70" />
                                                    <Label className="text-muted-foreground">{evento.telefone}</Label>
                                                </div>
                                            </div>
                                        </div>
                                    );                                    
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}