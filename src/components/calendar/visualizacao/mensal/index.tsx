import React, { useState } from 'react';
import { format, eachDayOfInterval, isSameMonth, isSameWeek, isToday } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Evento from '@/components/modal/evento';

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
      <div className="grid grid-cols-1 items-center h-[80%] gap-4">
        {semanasDoMes.map((semana, indiceSemana) => (
          <div key={indiceSemana} className="grid grid-cols-7 gap-4">
            {eachDayOfInterval({
              start: semana,
              end: new Date(semana.getFullYear(), semana.getMonth(), semana.getDate() + 6),
            }).map((dia, indiceDia) => (
              <DialogTrigger>
                <div
                  key={indiceDia}
                  onClick={() => handleDayClick(dia)}
                  className={`border text-center h-full flex flex-col justify-between 
                ${isSameMonth(dia, currentDate) ? ' hover:border-200 hover:text-200 border-2 cursor-pointer' : 'text-gray-300 border-gray-300 font-bold text-gray-500 cursor-not-allowed '}
                ${isToday(dia) ? 'bg-200 text-white hover:bg-white' : 'bg-white'}
                rounded-2xl text-black gap-[100px] `}
                >
                  <span className="font-bold">{format(dia, 'dd')}</span>
                  <span className="font-bold">{format(dia, 'EEEE', { locale: pt })}</span>
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
