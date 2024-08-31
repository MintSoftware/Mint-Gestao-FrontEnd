import { TimePicker } from '@/components/core/time-picker/time-picker.';
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
import Api from '@/infra/api';
import { cn } from '@/lib/utils';
import { Evento } from '@/types/Evento';
import { Local } from '@/types/Local';
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { CalendarIcon, CheckIcon, ChevronDownIcon, ClockIcon, FlagIcon, PhoneCallIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { z } from "zod";

interface EventoProps {
    data?: Date;
    onClose: () => void;
    eventos?: Evento[];
}

export const CadastroEvento = ({ data, onClose, eventos }: EventoProps) => {

    const [loadingLocais, setLoadingLocais] = useState(false);
    const [locais, setLocais] = useState<Local[]>();
    const [localSelecionadoFiltro, setLocalSelecionadoFiltro] = useState<Local>();
    const [openFiltroLocal, setOpenFiltroLocal] = useState(false);
    const [valorHora, setValorHora] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);


    const FormSchema = z.object({
        local: z.string().refine(value => value.length > 0, {
            message: 'Local é obrigatório',
        }),
        diaEvento: z.date().nullable().refine(value => value !== null, {
            message: 'Data é obrigatória',
        }).refine(value => value > new Date(), {
            message: 'Data deve ser maior que a data atual',
        }),
        nome: z.string().refine(value => value.length > 0, {
            message: 'Nome é obrigatório',
        }),
        sobrenome: z.string().refine(value => value.length > 0, {
            message: 'Sobrenome é obrigatório',
        }),
        telefone: z.string().refine(value => value.length === 11, {
            message: 'Telefone deve conter 11 dígitos',
        }),
        email: z.string().email(),
        horainicio: z.date().refine(value => value.getHours() > 0, {
            message: 'Hora de início inválida',
        }),
        horafim: z.date().refine(value => value.getHours() > 0, {
            message: 'Hora de fim inválida',
        })
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            local: '',
            diaEvento: undefined,
            nome: '',
            sobrenome: '',
            telefone: '',
            email: '',
            horainicio: new Date(0, 0, 0, 0, 0, 0),
            horafim: new Date(0, 0, 0, 0, 0, 0),
        }
    })

    const hours = Array.from({ length: 24 }, (_, i) => i)

    const calcularTamanhoPelaQuantHora = (quantidadeHoras: number) => {
        return quantidadeHoras * 3.4
    }

    const buscarLocais = async () => {
        try {
            setLoadingLocais(true);
            const { data } = await Api.get('gestao/local');
            setLocais(data);
            setLoadingLocais(false);
        } catch (error) {
            setLoadingLocais(false);
            toast.error('Erro ao buscar locais');
        }
    };

    const limparDados = () => {
        form.setValue('local', '');
        form.setValue('nome', '');
        form.setValue('sobrenome', '');
        form.setValue('telefone', '');
        form.setValue('email', '');
        form.setValue('horainicio', new Date(0, 0, 0, 0, 0, 0));
        form.setValue('horafim', new Date(0, 0, 0, 0, 0, 0));
        form.reset();

        setLocalSelecionadoFiltro(undefined);
        form.clearErrors();
    }

    const limparDadosEFechar = () => {
        limparDados();
        fechar();
    }

    const fechar = () => {
        onClose();
    }

    const handleLocalSelecionadoFiltro = (local: Local) => {

        if (localSelecionadoFiltro == local) {
            setLocalSelecionadoFiltro(undefined);
            setOpenFiltroLocal(false);
            return;
        }

        setLocalSelecionadoFiltro(local);
        setOpenFiltroLocal(false);
    }

    useEffect(() => {
        calcularValorHora();
    }, [localSelecionadoFiltro]);

    useEffect(() => {
        calcularValorTotal();
    }, [form.getFieldState('horainicio'), form.getFieldState('horafim')]);

    const calcularValorHora = () => {
        const horainicio = form.getValues('horainicio'),
            horafim = form.getValues('horafim');

        setValorHora(localSelecionadoFiltro?.valorHora || 0);

        if (!horainicio || !horafim || horafim.getHours() <= horainicio.getHours()) return;

        const quantidadeHoras = horafim.getHours() - horainicio.getHours();
        setValorTotal((localSelecionadoFiltro?.valorHora || 0) * quantidadeHoras);
    }

    const calcularValorTotal = () => {
        const horainicio = form.getValues('horainicio'),
            horafim = form.getValues('horafim');

        if (horafim.getHours() <= horainicio.getHours()) return;

        const quantidadeHoras = new Date(horafim).getHours() - new Date(horainicio).getHours();
        setValorTotal((localSelecionadoFiltro?.valorHora || 0) * quantidadeHoras);
    }

    const ajustarDataHoraInicio = () => {
        const horainicio = form.getValues('horainicio');
        return new Date(form.getValues('diaEvento').setHours(horainicio.getHours(), horainicio.getMinutes(), horainicio.getSeconds()));
    }

    const ajustarDataHoraFim = () => {
        const horafim = form.getValues('horafim');
        return new Date(form.getValues('diaEvento').setHours(horafim.getHours(), horafim.getMinutes(), horafim.getSeconds()));
    }

    const salvarEvento = (values: z.infer<typeof FormSchema>) => {
        const evento = {
            nome: values.nome,
            sobrenome: values.sobrenome,
            email: values.email,
            telefone: values.telefone,
            valortotal: valorTotal,
            valorhora: valorHora,
            horainicio: ajustarDataHoraInicio(),
            horafim: ajustarDataHoraFim(),
            local: localSelecionadoFiltro
        }

        toast.promise(Api.post("gestao/evento", evento, {}).then(async () => {
            toast.success("Evento Salvo com sucesso!");
            limparDadosEFechar();
        }).catch((error) => {
            toast.error(
                error.response.data
                    .join(';\n\n'),
                {
                    style: {
                        whiteSpace: 'pre-line',
                        padding: '10px',
                        borderRadius: '8px',
                        fontSize: '14px',
                    },
                }
            );
        }), {
            loading: "Salvando...",
        });
    }

    const listaHora: Date[] = [
        new Date(1970, 0, 1, 0, 0, 0),
        new Date(1971, 0, 1, 1, 0, 0),
        new Date(1972, 0, 1, 2, 0, 0),
        new Date(1973, 0, 1, 3, 0, 0),
        new Date(1974, 0, 1, 4, 0, 0),
        new Date(1975, 0, 1, 5, 0, 0),
        new Date(1976, 0, 1, 6, 0, 0),
        new Date(1977, 0, 1, 7, 0, 0),
        new Date(1978, 0, 1, 8, 0, 0)
    ]

    return (
        <DialogContent onInteractOutside={(evento) => evento.preventDefault()} className="sm:max-w-[60%] h-[80%]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(salvarEvento)}>
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
                                                                        {localSelecionadoFiltro?.nome
                                                                            ? locais?.find((local) => local.id === localSelecionadoFiltro.id)?.nome
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
                                                                                        handleLocalSelecionadoFiltro(local)
                                                                                        form.setValue('local', local.id);
                                                                                    }}
                                                                                    {...form.register("local")}
                                                                                    className="flex cursor-pointer w-full max-w-full hover:bg-muted/50"
                                                                                >
                                                                                    <CommandItem>
                                                                                        <CheckIcon
                                                                                            className={cn(
                                                                                                "mr-2 h-4 w-4",
                                                                                                localSelecionadoFiltro?.id === local.id ? "opacity-100" : "opacity-0"
                                                                                            )}
                                                                                        />
                                                                                        {local.nome}
                                                                                    </CommandItem>
                                                                                </CommandList>
                                                                            ))}
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
                                                                <TimePicker date={form.getValues('horainicio')} setDate={(date) => form.setValue('horainicio', date)} listaHoras={listaHora} {...form.register("horainicio")} />
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
                                                                <TimePicker date={form.getValues('horafim')} setDate={(date) => form.setValue('horafim', date)} listaHoras={listaHora} {...form.register("horafim")} />
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
                                            {hours.map((hour) => {
                                                const timeString = `${hour.toString().padStart(2, '0')}:00`
                                                const hourEvents = eventos?.filter(evento =>
                                                    new Date(evento.horainicio).getHours() === hour
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
                                                                const quantidadeHoras = new Date(evento.horafim).getHours() - new Date(evento.horainicio).getHours();

                                                                return (
                                                                    <div
                                                                        key={evento.id}
                                                                        className="z-20 cursor-pointer bg-secondary relative left-0 right-0 rounded-md p-2 text-xs flex flex-col justify-between hover:bg-muted/50 transition-colors duration-200"
                                                                        style={{ height: `${calcularTamanhoPelaQuantHora(quantidadeHoras)}rem` }}
                                                                        onClick={() => {
                                                                            form.setValue('local', evento.local.nome);
                                                                            form.setValue('diaEvento', new Date(evento.horainicio));
                                                                            form.setValue('nome', evento.nome);
                                                                            form.setValue('sobrenome', evento.sobrenome);
                                                                            form.setValue('telefone', evento.telefone);
                                                                            form.setValue('email', evento.email);
                                                                            form.setValue('horainicio', new Date(evento.horainicio));
                                                                            form.setValue('horafim', new Date(evento.horafim));
                                                                            setLocalSelecionadoFiltro(evento.local);
                                                                            setOpenFiltroLocal(false);
                                                                        }
                                                                        }
                                                                    >
                                                                        <div className="flex items-center gap-2 cursor-pointer">
                                                                            <div className="flex gap-2 mt-0.5 mr-4 cursor-pointer">
                                                                                <ClockIcon className="h-4 w-4 opacity-70 cursor-pointer" />
                                                                                <Label className="cursor-pointer text-muted-foreground">{new Date(evento.horainicio).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}</Label>
                                                                            </div>
                                                                            <Avatar className="h-4 w-4">
                                                                                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${evento.nome} ${evento.sobrenome}`} />
                                                                                <AvatarFallback>{evento.nome}{evento.sobrenome}</AvatarFallback>
                                                                            </Avatar>
                                                                            <Label className="cursor-pointer text-muted-foreground truncate w-[10rem]">{evento.nome} {evento.sobrenome}</Label>
                                                                        </div>
                                                                        <div className="flex gap-2 cursor-pointer">
                                                                            <FlagIcon className="cursor-pointer h-4 w-4 opacity-70" />
                                                                            <Label className="cursor-pointer text-muted-foreground mr-4">{new Date(evento.horafim).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}</Label>
                                                                            <div className="flex gap-2 cursor-pointer">
                                                                                <PhoneCallIcon className="h-4 w-4 opacity-70" />
                                                                                <Label className="cursor-pointer text-muted-foreground">{evento.telefone}</Label>
                                                                            </div>
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
