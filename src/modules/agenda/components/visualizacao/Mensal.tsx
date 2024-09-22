import { ScrollArea } from "@/components/ui/scroll-area";
import { useAgendaContext } from "@/providers/AgendaProvider";
import { CadastroEvento } from "../cadastro/CadastroEvento";
import { DiaDaSemana } from "../DiaDaSemana";
import { DiasDoMes } from "../DiasDoMes";

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
      lotados
    } = useAgendaContext();
  
    return (
      <div className="flex h-full w-full">
        <div className="flex items-center h-full w-full justify-between">
          <div className="flex h-[46.5rem] w-full rounded-[20px]">
            <div className="flex-1 p-2 rounded-[20px] justify-center items-center">
              <DiaDaSemana daysOfWeek={daysOfWeek} />
              <ScrollArea className="desktop:h-[43rem] notebook:h-[29rem] w-full">
                <DiasDoMes
                  firstDayOfMonth={firstDayOfMonth}
                  daysInMonth={daysInMonth}
                  currentDate={currentDate}
                  eventos={eventos}
                  feriados={feriados}
                  lotados={lotados}
                  handleDateClick={handleDateClick}
                  loadingEventos={loadingEventos}
                />
                <CadastroEvento data={selectedDate} onClose={() => setSelectedDate(undefined)} eventos={eventosDia} />
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    );
  }
  