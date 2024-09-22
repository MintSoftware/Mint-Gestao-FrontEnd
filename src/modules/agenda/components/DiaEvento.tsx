import { DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { parseISO } from "date-fns";

export const DiaEvento = ({ day, currentDate, eventos, feriados, handleDateClick, loadingEventos } : any) => {
    const isToday =
      new Date().getDate() === day &&
      new Date().getMonth() === currentDate.getMonth() &&
      new Date().getFullYear() === currentDate.getFullYear();
  
    const eventosDoDia = eventos.filter(
      (evento : any) =>
        parseISO(evento.dataevento).getDate() === day &&
      parseISO(evento.dataevento).getMonth() === currentDate.getMonth() &&
      parseISO(evento.dataevento).getFullYear() === currentDate.getFullYear()
    );
  
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger>
              <div
                className={`relative rounded-[15px] border cursor-pointer transition-colors bg-background hover:bg-muted/50 h-[8rem]`}
                onClick={() => handleDateClick(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
              >
                <div className="flex items-center justify-end gap-1">
                  <div className="w-3 h-3"></div>
                  <div className={`absolute left-0 top-1 w-full items-center text-sm font-medium ${isToday ? "text-foreground" : "text-foreground"}`}>
                    {day < 10 ? '0' + day : day}
                  </div>
                  {isToday && <div className="absolute top-2 right-3 w-3 h-3 rounded-full bg-green-500" />}
                  {feriados.isHoliday(new Date(currentDate.getFullYear(), currentDate.getMonth(), day)) && (
                    <div className="absolute top-2 right-3 w-3 h-3 rounded-full bg-purple-500" />
                  )}
                </div>
                <div className="flex flex-col h-[7rem] justify-end p-1">
                  {!loadingEventos
                    ? eventosDoDia.map((evento : any, index : any) => (
                        <div key={index} className="flex text-sm text-muted-foreground bg-gray-300 dark:bg-secondary rounded mt-1">
                          <div className="flex w-full h-5 mx-2 overflow-hidden justify-center items-center">
                            <Label>
                              {evento.nome} - {evento.horainicio.slice(0, 5)} - {evento.horafim.slice(0, 5)}
                            </Label>
                          </div>
                        </div>
                      ))
                    : <Skeleton className="h-[6rem] notebook:w-[11.2rem] desktop:w-[14.5rem]" />}
                </div>
              </div>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent className="bg-muted">
            {eventosDoDia.length > 0 ? (
              eventosDoDia.map((evento : any, index : any) => (
                <div key={index} className="flex text-sm text-muted-foreground p-1 items-center justify-center">
                  <Label>{evento.nome} - {evento.horainicio.slice(0, 5)} - {evento.horafim.slice(0, 5)}</Label>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">Sem Eventos</div>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };
  