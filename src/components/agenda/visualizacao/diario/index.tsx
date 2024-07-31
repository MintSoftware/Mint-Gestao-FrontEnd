import { format, isToday } from 'date-fns';
import { pt } from 'date-fns/locale';

interface DiarioProps {
  currentDate: Date;
  timeInterval: Date[];
}

const Diario = ({ currentDate, timeInterval }: DiarioProps) => {
  return (
    <div className="flex flex-col items-start h-[35.95rem] w-full">
      <div className={`bg-white p-3 border text-black ext-center w-full h-[100%] flex justify-between cursor-pointer flex-col rounded-2xl ${isToday(currentDate) ? 'hoje-diario' : ''} mb-10`}>
        {currentDate ? (
          <>
            <span className="text-xl font-bold flex items-center justify-center text-center w-full numero-do-dia-diario">{format(currentDate, 'dd')}</span>
            <div className="flex flex-col items-start mt-10 h-full w-full">
              {timeInterval.map((hora, index) => (
                <div key={index} className="flex itens-center justify-left w-full h-full text-sm hora-diario">
                  {format(hora, 'HH:mm')}
                </div>
              ))}
            </div>
            <span className=" font-bold w-full text-center dia-da-semana-diario">{format(currentDate, 'EEEE', { locale: pt })}</span>
          </>
        ) : (
          <span>Data Inválida</span>
        )}
      </div>
    </div>
  );
}

export default Diario;