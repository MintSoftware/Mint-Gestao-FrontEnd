import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { stringParaDate } from '@/core/horas/Horas';
import { InputBase } from '@/core/input/base';
import { cn } from '@/lib/utils';
import { Evento } from '@/types/Evento';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import { CalendarIcon, CheckIcon, ChevronDownIcon, ClockIcon, FlagIcon, PhoneCallIcon, Trash2 } from 'lucide-react';
import { useCadastroEventoController } from './CadastroEventoController';

interface EventoProps {
    data?: Date;
    onClose: () => void;
    eventos?: Evento[];
}

export const CadastroEvento = ({ data, onClose, eventos }: EventoProps) => {

    const {
        form,
        listaHora,
        loadingLocais,
        valorHora,
        valorTotal,
        localSelecionado,
        setlocalSelecionado,
        openFiltroLocal,
        setOpenFiltroLocal,
        buscarLocais,
        salvarEvento,
        limparDadosEFechar,
        calcularTamanhoPelaQuantHora,
        horasTimeLine,
        handlelocalSelecionado,
        locais,
        cancelarEvento,
        editarEvento,
        idLocalSelecionado,
        setIdLocalSelecionado,
        calcularValorTotal
    } = useCadastroEventoController(onClose);

    const MetodoSubmit = (idLocalSelecionado) ? editarEvento : salvarEvento;
    const handleHorainicio = (date: any) => {
        form.setValue('horainicio', date);
        calcularValorTotal();
    }
    const handleHorafim = (date: any) => {
        form.setValue('horafim', date);
        calcularValorTotal();
    }

    return (
        <DialogContent onInteractOutside={(evento) => evento.preventDefault()} className="sm:max-w-[60%] h-[80%]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(MetodoSubmit)}>
                    <ResizablePanelGroup direction="horizontal">
                        <ResizablePanel className='p-5 w-max max-w-[75%] min-w-[52%]'>
                            <DialogHeader>
                                <DialogTitle>Cadastro</DialogTitle>
                                <DialogDescription>
                                    {(data) ? `Cadastre eventos para o dia ${format(data, 'dd/MM/yyyy', { locale: pt })}` : 'Cadastre eventos'}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-4 align-middle py-5 mt-5">
                                <div className="flex flex-col gap-4">
                                    <FormField
                                        control={form.control}
                                        name="local"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel>Local*</FormLabel>
                                                <FormControl>
                                                    <div>
                                                        <Popover open={openFiltroLocal} onOpenChange={setOpenFiltroLocal} modal>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    role="combobox"
                                                                    aria-expanded={openFiltroLocal}
                                                                    className=" justify-between border flex w-full"
                                                                    onClick={() => buscarLocais()}
                                                                >
                                                                    <Label className="text-muted-foreground ">
                                                                        {localSelecionado?.nome
                                                                            ? locais?.find((local) => local.id === localSelecionado.id)?.nome
                                                                            : "Selecione um local"}
                                                                    </Label>
                                                                    <ChevronDownIcon className='m-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200' style={{
                                                                        transform: openFiltroLocal ? 'rotate(180deg)' : 'rotate(0deg)',
                                                                    }} />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="p-0 popover-content-width-full z-50 border">
                                                                <Command>
                                                                    {(loadingLocais) ? <></> :
                                                                        <div>
                                                                            <CommandInput placeholder="Busque o local aqui..." />
                                                                            <CommandEmpty>
                                                                                <Label>Local não encontrado</Label>
                                                                            </CommandEmpty>
                                                                        </div>
                                                                    }
                                                                    <CommandGroup heading=''>
                                                                        {(loadingLocais) ? <div className="flex flex-col gap-2">
                                                                            <Skeleton className="h-[1.5rem] w-full" />
                                                                            <Skeleton className="h-[1.5rem] w-full" />
                                                                            <Skeleton className="h-[1.5rem] w-full" />
                                                                            <Skeleton className="h-[1.5rem] w-full" />
                                                                            <Skeleton className="h-[1.5rem] w-full" />
                                                                            <Skeleton className="h-[1.5rem] w-full" />
                                                                            <Skeleton className="h-[1.5rem] w-full" />
                                                                            <Skeleton className="h-[1.5rem] w-full" />
                                                                            <Skeleton className="h-[1.5rem] w-full" />
                                                                        </div> :
                                                                            locais?.map((local) => (
                                                                                <CommandList
                                                                                    key={local.id}
                                                                                    onClick={() => {
                                                                                        handlelocalSelecionado(local)
                                                                                        form.setValue('local', local.id);
                                                                                    }}
                                                                                    {...form.register("local")}
                                                                                    className="flex cursor-pointer w-full max-w-full hover:bg-muted/50"
                                                                                >
                                                                                    <CommandItem>
                                                                                        <CheckIcon
                                                                                            className={cn(
                                                                                                "mr-2 h-4 w-4",
                                                                                                localSelecionado?.id === local.id ? "opacity-100" : "opacity-0"
                                                                                            )}
                                                                                        />
                                                                                        {local.nome}
                                                                                    </CommandItem>
                                                                                </CommandList>
                                                                            ))
                                                                        }
                                                                    </CommandGroup>
                                                                </Command>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    <div className='flex justify-between'>
                                        <div className='flex mr-3'>
                                            <FormField
                                                control={form.control}
                                                name="diaEvento"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Data*</FormLabel>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl
                                                                >
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-[240px] pl-3 text-left font-normal",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                    >
                                                                        {field.value !== undefined ? (
                                                                            format(field.value, "PPP", { locale: pt })
                                                                        ) : (
                                                                            <span>Selecione a data</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="flex" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={form.getValues('diaEvento')}
                                                                    onSelect={(date) => {
                                                                        form.setValue('diaEvento', date as Date);
                                                                        field.onChange(date)
                                                                    }}
                                                                    className='bg-background rounded'
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className='flex w-full'>
                                            <div className='flex flex-col w-full'>
                                                <FormField
                                                    control={form.control}
                                                    name="horainicio"
                                                    render={() => (
                                                        <FormItem >
                                                            <FormLabel className='pl-5'>Início*</FormLabel>
                                                            <FormControl>
                                                                <InputBase listaHoras={listaHora} type="time" value={form.getValues('horainicio')} onChange={(date) => handleHorainicio(date)} />
                                                            </FormControl>
                                                            <FormMessage className='pl-5' />
                                                        </FormItem>
                                                    )} />
                                            </div>
                                            <div className='flex flex-col w-full'>
                                                <FormField
                                                    control={form.control}
                                                    name="horafim"
                                                    render={() => (
                                                        <FormItem>
                                                            <FormLabel className='pl-5'>Fim*</FormLabel>
                                                            <FormControl>
                                                                <InputBase listaHoras={listaHora} type="time" value={form.getValues('horafim')} onChange={(date) => handleHorafim(date)} />
                                                            </FormControl>
                                                            <FormMessage className='pl-5' />
                                                        </FormItem>
                                                    )} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex w-full gap-3'>
                                        <div className='flex flex-col w-full'>
                                            <FormField
                                                control={form.control}
                                                name="nome"
                                                render={() => (
                                                    <FormItem>
                                                        <FormLabel>Nome*</FormLabel>
                                                        <FormControl>
                                                            <Input id="cliente" placeholder="Inseira o nome" {...form.register("nome")} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <FormField
                                                control={form.control}
                                                name="sobrenome"
                                                render={() => (
                                                    <FormItem>
                                                        <FormLabel>Sobrenome*</FormLabel>
                                                        <FormControl>
                                                            <Input id="cliente" placeholder="Inseira o sobrenome" className="col-span-3" {...form.register("sobrenome")} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                        </div>
                                    </div>
                                    <div className='flex w-full gap-3'>
                                        <div className='flex flex-col w-full'>
                                            <FormField
                                                control={form.control}
                                                name="telefone"
                                                render={() => (
                                                    <FormItem>
                                                        <FormLabel>Telefone*</FormLabel>
                                                        <FormControl>
                                                            <Input id="telefone" placeholder="Inseira o telefone" className="col-span-3" {...form.register("telefone")} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={() => (
                                                    <FormItem>
                                                        <FormLabel>Email*</FormLabel>
                                                        <FormControl>
                                                            <Input id="cliente" placeholder="Inseira o email" className="col-span-3" {...form.register("email")} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <div className='flex justify-between w-full items-center mt-10'>
                                    <div className='flex gap-8'>
                                        <div>
                                            <Label>Valor Hora: R$ {valorHora}</Label>
                                        </div>
                                        <div>
                                            <Label>Valor Total: R$ {valorTotal}</Label>
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <DialogClose onClick={limparDadosEFechar}>
                                            <Button type='button' variant="outline">Voltar</Button>
                                        </DialogClose>
                                        <Button type="submit">
                                            Reservar
                                        </Button>
                                    </div>
                                </div>
                            </DialogFooter>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={40} className='relative py-5 pl-5 max-w-[55%] min-w-[25%]'>
                            Eventos
                            <div>
                                <ScrollArea className='h-[37rem]'>
                                    <div className="container mx-auto p-4 max-w-4xl">
                                        <div className="relative">
                                            <div className="absolute top-0 bottom-0 left-16 w-px bg-secondary"></div>
                                            {horasTimeLine.map((hour) => {
                                                const timeString = `${hour.toString().padStart(2, '0')}:00`
                                                const hourEvents = eventos?.filter(evento =>
                                                    stringParaDate(evento.horainicio).getHours() === hour
                                                )
                                                return (
                                                    <div key={hour} className="flex">
                                                        <div className="flex items-center w-16">
                                                            <div className="absolute left-16 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2"></div>
                                                            <ClockIcon className="mr-1 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                                                            <span className="text-sm font-medium text-muted-foreground">{timeString}</span>
                                                        </div>
                                                        <div className="flex-grow ml-4 h-14 relative top-7">
                                                            {hourEvents?.map(evento => {
                                                                const quantidadeHoras = stringParaDate(evento.horafim).getHours() - stringParaDate(evento.horainicio).getHours();
                                                                return (
                                                                    <div
                                                                        key={evento.id}
                                                                        className="z-20 cursor-pointer bg-gray-300 dark:bg-secondary relative left-0 right-0 rounded-md p-2 text-xs flex flex-col justify-between hover:bg-muted/50 transition-colors duration-200"
                                                                        style={{ height: `${calcularTamanhoPelaQuantHora(quantidadeHoras)}rem` }}
                                                                        onClick={() => {
                                                                            setIdLocalSelecionado(evento.id);
                                                                            form.setValue('local', evento.local.nome);
                                                                            form.setValue('diaEvento',  parseISO(evento.dataevento.toString()));
                                                                            form.setValue('nome', evento.nome);
                                                                            form.setValue('sobrenome', evento.sobrenome);
                                                                            form.setValue('telefone', evento.telefone);
                                                                            form.setValue('email', evento.email);
                                                                            form.setValue('horainicio', stringParaDate(evento.horainicio));
                                                                            form.setValue('horafim', stringParaDate(evento.horafim));
                                                                            setlocalSelecionado(evento.local);
                                                                            setOpenFiltroLocal(false);
                                                                        }
                                                                        }
                                                                    ><div className='flex h-full items-center gap-2'>
                                                                            <div className='flex flex-col gap-2'>
                                                                                <div className="flex items-center gap-2 cursor-pointer">
                                                                                    <div className="flex gap-2 mt-0.5 mr-4 cursor-pointer">
                                                                                        <ClockIcon className="h-4 w-4 opacity-70 cursor-pointer" />
                                                                                        <Label className="cursor-pointer text-muted-foreground">{evento.horainicio.slice(0, 5)}</Label>
                                                                                    </div>
                                                                                    <Avatar className="h-4 w-4">
                                                                                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${evento.nome} ${evento.sobrenome}`} />
                                                                                        <AvatarFallback>{evento.nome}{evento.sobrenome}</AvatarFallback>
                                                                                    </Avatar>
                                                                                    <Label className="cursor-pointer text-muted-foreground truncate w-[10rem]">{evento.nome} {evento.sobrenome}</Label>
                                                                                </div>
                                                                                <div className="flex gap-2 cursor-pointer">
                                                                                    <FlagIcon className="cursor-pointer h-4 w-4 opacity-70" />
                                                                                    <Label className="cursor-pointer text-muted-foreground mr-4">{evento.horafim.slice(0, 5)}</Label>
                                                                                    <div className="flex gap-2 cursor-pointer">
                                                                                        <PhoneCallIcon className="h-4 w-4 opacity-70" />
                                                                                        <Label className="cursor-pointer text-muted-foreground">{evento.telefone}</Label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <AlertDialog>
                                                                                <AlertDialogTrigger asChild>
                                                                                    <Trash2 className="cursor-pointer h-4 w-4 text-red-500" />
                                                                                </AlertDialogTrigger>
                                                                                <AlertDialogContent>
                                                                                    <AlertDialogTitle>
                                                                                        Cancelar Reserva
                                                                                    </AlertDialogTitle>
                                                                                    <AlertDialogDescription>
                                                                                        Deseja realmente cancelar a reserva?
                                                                                    </AlertDialogDescription>
                                                                                    <AlertDialogFooter>
                                                                                        <AlertDialogCancel>
                                                                                            Não
                                                                                        </AlertDialogCancel>
                                                                                        <AlertDialogAction onClick={() => cancelarEvento(evento.id)}>
                                                                                            Sim
                                                                                        </AlertDialogAction>
                                                                                    </AlertDialogFooter>
                                                                                </AlertDialogContent>
                                                                            </AlertDialog>
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
                                </ScrollArea>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </form>
            </Form >
        </DialogContent >
    );
}
