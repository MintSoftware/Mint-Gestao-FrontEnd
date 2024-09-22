import { DiaEvento } from "./DiaEvento";
import { DiaInativo } from "./DiaInativo";

export const DiasDoMes = ({ firstDayOfMonth, daysInMonth, currentDate, eventos, feriados, handleDateClick, loadingEventos } : any) => (
    <div className="grid grid-cols-7 gap-2 bg- p-3">
      {Array.from({ length: firstDayOfMonth }, (_, i) => (
        <DiaInativo
          key={i}
          day={new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, daysInMonth - firstDayOfMonth + i + 1).getDate()}
        />
      ))}
      {Array.from({ length: daysInMonth }, (_, i) => (
        <DiaEvento
          key={i}
          day={i + 1}
          currentDate={currentDate}
          eventos={eventos}
          feriados={feriados}
          handleDateClick={handleDateClick}
          loadingEventos={loadingEventos}
        />
      ))}
    </div>
  );
  