import Evento from '@/components/agenda/evento';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { eachDayOfInterval, format, isSameMonth, isToday } from 'date-fns';
import { pt } from 'date-fns/locale';
import { useState } from 'react';

interface MensalProps {
  semanasDoMes: Date[];
  currentDate: Date;
}

const Mensal = ({ semanasDoMes, currentDate }: MensalProps) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDayClick = (day: any) => {
    setSelectedDate(day);
  };

  return (
    <Dialog>
      <div className="grid grid-cols-1 items-center h-full w-full gap-4">
        {semanasDoMes.map((semana, indiceSemana) => (
          <div key={indiceSemana + semana.getMilliseconds()} className="grid grid-cols-7 gap-4">
            {eachDayOfInterval({
              start: semana,
              end: new Date(semana.getFullYear(), semana.getMonth(), semana.getDate() + 6),
            }).map((dia, indiceDia) => (
              <DialogTrigger key={`${indiceSemana}-${indiceDia}`}>
                <div
                  key={`${indiceSemana}-${indiceDia}`}
                  onClick={() => handleDayClick(dia)}
                  className={`border text-center h-[130px] flex flex-col justify-between
                    ${isSameMonth(dia, currentDate) ? '' : 'bg-muted cursor-not-allowed border-black'}
                    ${isToday(dia) ? 'bg-200 text-white hover:border-white hover:text-white' : 'bg-background'}
                    rounded-2xl text-mutedwhite hover:text-200 hover:border-200`}
                >
                  {indiceSemana === 0 &&
                    <div className='flex flex-col'>
                      <Label className='p-2 text-200'>{format(dia, 'EEEE', { locale: pt })}</Label>
                      <Label className="font-small">{format(dia, 'dd')}</Label>
                    </div>                          
                  }
                  {indiceSemana !== 0 &&
                    <div className=''>
                      <Label className="font-small">{format(dia, 'dd')}</Label>
                    </div>
                  }
                  <Label className='p-1 text-xs cursor-pointer'>Ver mais</Label>
                </div>
              </DialogTrigger>
            ))}
          </div>
        ))}
        {selectedDate && isSameMonth(selectedDate, currentDate) && <Evento date={selectedDate} onClose={() => setSelectedDate(null)} />}
      </div>
    </Dialog>
  );
};

export default Mensal;
