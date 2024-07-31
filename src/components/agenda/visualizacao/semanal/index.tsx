import { addDays, format, isToday, startOfWeek } from 'date-fns';
import { pt } from 'date-fns/locale';

interface SemanalProps {
  currentDate: Date;
}

const Semanal = ({ currentDate }: SemanalProps) => {
  const diasDaSemana = [];
  let startDay = startOfWeek(currentDate);

  for (let i = 0; i < 7; i++) {
    const dia = addDays(startDay, i);
    diasDaSemana.push(dia);
  }

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex gap-7 h-[35.9rem] w-full">
        {diasDaSemana.map((dia, indiceDia) => (
          <div
            key={indiceDia}
            className={` h-[100%] w-[180px] border border-gray-black rounded-2xl flex flex-col justify-center items-center cursor-pointer content-center justify-between p-3
              ${isToday(dia) ? "bg-200 text-black border-2 font-bold hover:border-200 hover:border-4 hover:bg-white hover:text-200 content-center items-center" : "bg-white text-black hover:border-200 hover:text-200 border-2 content-center items-center hover:border-4"}`}  
          >
            {dia ? (
              <>
                <span className="text-xl font-bold">{format(dia, 'dd')}</span>
                {/* <div className={`h-1 w-20 ${isToday(dia) ? "bg-white" : "bg-black"}  rounded-full`}></div> */}
                <span className="font-bold">{format(dia, 'EEEE', { locale: pt })}</span>
              </>
            ) : (
              <span>Data Inválida</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Semanal;
