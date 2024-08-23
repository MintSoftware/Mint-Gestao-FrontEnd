import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { cn } from '@/style/lib/utils';
import { Evento } from '@/types/Evento';
import { Local } from '@/types/Local';
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import TimeLine from '../timeline';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EventoProps {
    data?: Date;
    onClose: () => void;
    eventos?: Evento[];
}

const FormSchema = z.object({
    dob: z.date({
        required_error: "A Data do evento é obrigatória!",
    }),
})

export const CadastroEvento = ({ data, onClose, eventos }: EventoProps) => {

    const [local, /* setLocal */] = useState<Local>();
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [valorTotal, /* setValorTotal */] = useState(0);
    const [valorHora, /* setValorHora */] = useState(0);
    const [diaEvento, setDiaEvento] = useState<Date>();
    const [horainicio, setHoraInicio] = useState<Date>(new Date(0, 0, 0, 0, 0, 0));
    const [horafim, setHoraFim] = useState<Date>(new Date(0, 0, 0, 0, 0, 0));

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    if (!data || data < new Date()) {
        data = new Date();
    }

    return (
        <DialogContent onInteractOutside={(evento) => evento.preventDefault()} className="sm:max-w-[60%] h-[75%]">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel className='p-5 w-max max-w-[75%] min-w-[45%]'>
                    <DialogHeader>
                        <DialogTitle>Cadastro</DialogTitle>
                        <DialogDescription>
                            {(data) ? `Cadastre eventos para o dia ${format(data, 'dd/MM/yyyy', { locale: pt })}` : 'Cadastre eventos'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 align-middle py-5 mt-5">
                        <div className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="local" className="text-right">Local</Label>
                                <Input id="local" placeholder="Insira um local" className="col-span-3" value={local?.nome} />
                            </div>
                            <div className='flex justify-between'>
                                <div>
                                    <Label>Data</Label>
                                    <Form {...form} >
                                        <form className="flex ">
                                            <FormField
                                                control={form.control}
                                                name="dob"
                                                defaultValue={data}
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
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
                                                                        {field.value ? (
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
                                                                    selected={diaEvento}
                                                                    onSelect={(date) => setDiaEvento(date)}
                                                                    initialFocus
                                                                    className='bg-background border rounded'
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </form>
                                    </Form>
                                </div>
                                <div>
                                    <Label htmlFor="inicio" className="text-right">
                                        Início
                                    </Label>
                                    <Input id="inicio" type="time" className="time-input" value={horainicio?.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })} onChange={(e) => setHoraInicio(new Date(e.target.value))} />
                                </div>
                                <div>
                                    <Label htmlFor="fim" className="text-right">
                                        Fim
                                    </Label>
                                    <Input className="time-input" id="fim" type="time" value={horafim?.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })} onChange={(e) => setHoraFim(new Date(e.target.value))} />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="cliente" className="flex text-right mb-2">Nome</Label>
                                <Input id="cliente" placeholder="Inseira o nome" className="col-span-3" value={nome} onChange={(e) => setNome(e.target.value)} />
                            </div>
                            <div>
                                <Label htmlFor="cliente" className="flex text-right mb-2">Sobrenome</Label>
                                <Input id="cliente" placeholder="Inseira o sobrenome" className="col-span-3" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
                            </div>
                            <div>
                                <Label htmlFor="cliente" className="flex text-right mb-2">Telefone</Label>
                                <Input id="cliente" placeholder="Inseira o telefone" className="col-span-3" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                            </div>
                            <div>
                                <Label htmlFor="cliente" className="flex text-right mb-2">Email</Label>
                                <Input id="email" type='email' placeholder="Inseira o email" className="col-span-3" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                                <Button type="submit">
                                    Reservar
                                </Button>
                                <DialogClose>
                                    <Button variant="outline" onClick={() => onClose()}>Voltar</Button>
                                </DialogClose>
                            </div>
                        </div>
                    </DialogFooter>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={10} className='relative py-5 pl-5 max-w-[55%] min-w-[25%]'>
                    Eventos
                    <div>
                        <ScrollArea className='h-[37rem]'>
                            <TimeLine eventos={eventos} />
                        </ScrollArea>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </DialogContent >
    );
}
