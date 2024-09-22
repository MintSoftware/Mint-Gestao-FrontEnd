export const DiaDaSemana = ({ daysOfWeek } : any) => (
    <div className="grid grid-cols-7 mb-4 mt-3">
      {daysOfWeek.map((day : any, index : any) => (
        <div key={index} className="flex justify-center w-full text-center text-sm font-medium text-muted-foreground">
          {day}
        </div>
      ))}
    </div>
  );