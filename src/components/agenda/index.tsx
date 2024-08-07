import { useState } from 'react';
import Mensal2 from './visualizacao/mensal2';
import Semanal from './visualizacao/semanal';

type Visualizacao = 'mensal' | 'semanal' | 'diario';

const Calendario = () => {
    const [currentDate, /*setCurrentDate*/] = useState(new Date()),
        [vizualizacao, /*setVizualizacao*/] = useState<Visualizacao>('mensal');
        //[startHour, /*setStartHour*/] = useState('08:00'),
        //[endHour, /*setEndHour*/] = useState('22:00'),
        //[dateRange, setDateRange] = useState<Date[]>([]),
        //[onHoverFilter, setOnHoverFilter] = useState(false),
        //inicioDoMes = startOfMonth(currentDate),
        //finalDoMes = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
        //semanasDoMes = eachWeekOfInterval({ start: inicioDoMes, end: finalDoMes }, { weekStartsOn: 1 }).slice(0, 5),
        //mesDia = vizualizacao === 'diario' ? format(currentDate, 'dd, MMMM, yyyy', { locale: pt }) : format(currentDate, 'MMMM, yyyy', { locale: pt }),
        //filterRef = useRef(null),
        //filter = useRef(null);

    // const handleStartHourChange = (event: any) => {
    //     setStartHour(event.target.value);
    // };

    // const handleEndHourChange = (event: any) => {
    //     setEndHour(event.target.value);
    // };

    // useEffect(() => {
    //     setDateRange(gerarPeriodo());
    // }, [startHour, endHour]);

    // const gerarPeriodo = () => {
    //     const start = new Date(`2022-01-01T${startHour}`);
    //     const end = new Date(`2022-01-01T${endHour}`);
    //     const dateRange = [];

    //     while (start <= end) {
    //         dateRange.push(new Date(start));
    //         start.setTime(start.getTime() + 60 * 60 * 1000);
    //     }

    //     return dateRange;
    // };

    // const retroceder = () => {
    //     if (vizualizacao === 'mensal') setCurrentDate(subMonths(currentDate, 1));
    //     if (vizualizacao === 'semanal') setCurrentDate(subWeeks(currentDate, 1));
    //     if (vizualizacao === 'diario') setCurrentDate(subDays(currentDate, 1));
    // };

    // const avancar = () => {
    //     if (vizualizacao === 'mensal') setCurrentDate(addMonths(currentDate, 1));
    //     if (vizualizacao === 'semanal') setCurrentDate(addWeeks(currentDate, 1));
    //     if (vizualizacao === 'diario') setCurrentDate(addDays(currentDate, 1));
    // };

    // const irParaDiaAtual = () => {
    //     setCurrentDate(new Date());
    // };

    // const mudarVisualizacao = (novaVizualizacao: Visualizacao) => {
    //     setVizualizacao(novaVizualizacao);
    // };

    // const onHoverFilterHandler = () => {
    //     setOnHoverFilter(!onHoverFilter);
    // };

    // const handleClickOutsideFilter = (event: MouseEvent) => {
    //     const target = event.target as Node;

    //     if (filterRef.current && !(filterRef.current as any).contains(target) && filter.current && !(filter.current as any).contains(target)) {
    //         setOnHoverFilter(false);
    //     }
    // };

    // useEffect(() => {
    //     document.addEventListener('mousedown', handleClickOutsideFilter);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutsideFilter);
    //     };
    // }, []);

    return (
        // <div className="flex flex-col p-5 border rounded h-full w-full max-w-[90vw] max-h-[90vh]">
        //     <div className='flex items-center justify-between'>
        //         <div className='flex p-2 items-center w-full justify-center mb-8 bg-rgba(36, 36, 36, 0.985) backdrop-filter backdrop-blur-md bg-opacity-70 border border-white border-opacity-30 rounded-full '>
        //             <div className='right-0 left-0 flex items-center justify-between w-full'>
        //                 <div></div>
        //                 <div className='flex gap-10'>
        //                     <button onClick={retroceder}>
        //                         <ChevronLeftIcon size={30} />
        //                     </button>
        //                     <span className='diaMes text-lg font-bold'>{mesDia.charAt(0).toUpperCase() + mesDia.slice(1)}</span>
        //                     <button onClick={avancar}>
        //                         <ChevronRightIcon size={30} />
        //                     </button>
        //                 </div>
        //                 <div>
        //                     <Button className=' flex items-center justify-center px-4 py-2 rounded-full' onClick={irParaDiaAtual}>Hoje</Button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div className=' mb-4 flex justify-center space-x-4'>
        //         <button className={`bg-transparent border-none cursor-pointer rounded-full font-bold font-size-14 h-full w-32 focus:outline-none ${vizualizacao === 'mensal' ? 'text-200' : 'text-white'}`} onClick={() => mudarVisualizacao('mensal')}>Mensal</button>
        //         <button className={`bg-transparent border-none cursor-pointer rounded-full font-bold font-size-14 h-full w-32 focus:outline-none ${vizualizacao === 'semanal' ? 'text-200' : 'text-white'}`} onClick={() => mudarVisualizacao('semanal')}>Semanal</button>
        //         <button className={`bg-transparent border-none cursor-pointer rounded-full font-bold font-size-14 h-full w-32 focus:outline-none ${vizualizacao === 'diario' ? 'text-200' : 'text-white'}`} onClick={() => mudarVisualizacao('diario')}>Diário</button>
        //         <div className="funil flex items-center justify-center">
        //             <Popover>
        //                 <PopoverTrigger asChild>
        //                     <FilterIcon size={30} onClick={onHoverFilterHandler} className='cursor-pointer' />
        //                 </PopoverTrigger>
        //                 <PopoverContent className="flex text-center items-center flex-row justify-center text-center w-72 h-72 top-12 right-16 bg-opacity-90 backdrop-blur-md border border-200 border-opacity-30 shadow-lg rounded-2xl">
        //                     <div>
        //                         <label className='text-200 justify-center text-center items-center'>Inicio:</label>
        //                         <Input
        //                             type='time'
        //                             placeholder="00:00"
        //                             value={startHour}
        //                             onChange={handleStartHourChange}
        //                             className='flex itens-center text-center justify-center border-[#03bb85] rounded-full h-10 px-4 text-200 bg-transparent'
        //                         />
        //                         <label className='text-200'>Fim:</label>
        //                         <Input
        //                             type='time'
        //                             placeholder="00:00"
        //                             value={endHour}
        //                             onChange={handleEndHourChange}
        //                             className='flex itens-center hover:border-[#03bb85] border-[#03bb85] rounded-full h-10 px-4 text-200 bg-transparent'
        //                         />
        //                     </div>
        //                 </PopoverContent>
        //             </Popover>
        //         </div>
        //     </div>
        <div className='flex h-full w-full'>
            <div className='flex items-center h-full w-full justify-between'>
                {/* <Button variant={'ghost'} className='rounded-full p-5'>
                    <ChevronLeftIcon size={30} onClick={retroceder} />
                </Button> */}
                    {/* {vizualizacao === 'mensal' && <Mensal semanasDoMes={semanasDoMes} currentDate={currentDate} />} */}
                    {vizualizacao === 'mensal' && <Mensal2/>}
                    {vizualizacao === 'semanal' && <Semanal currentDate={currentDate} />}
                    {/*vizualizacao === 'diario' && <Diario currentDate={currentDate} timeInterval={dateRange} />*/}
                {/* <Button variant={'ghost'} className='rounded-full'>
                    <ChevronRightIcon size={30} onClick={avancar} />
                </Button> */}
            </div>
        </div >
    );
};

export default Calendario;
