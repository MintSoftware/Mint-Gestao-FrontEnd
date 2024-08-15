import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { cn } from '@/style/lib/utils';
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { useForm } from "react-hook-form";
import { z } from "zod";

interface EventoProps {
    data?: Date;
    onClose: () => void;
}

const FormSchema = z.object({
    dob: z.date({
        required_error: "A Data do evento é obrigatória!",
    }),
})

const Evento = ({ data, onClose }: EventoProps) => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    return (
        <DialogContent onInteractOutside={(evento) => evento.preventDefault()} onCloseAutoFocus={() => onClose()} className="sm:max-w-[60%] h-[75%]">
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
                                <Input id="local" placeholder="Insira um local" className="col-span-3" />
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
                                                                    selected={field.value}
                                                                    onSelect={field.onChange}
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
                                    <Input id="inicio" type="time" value="00:00" className="time-input" />
                                </div>
                                <div>
                                    <Label htmlFor="fim" className="text-right">
                                        Fim
                                    </Label>
                                    <Input className="time-input" id="fim" type="time" value="00:00" />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="cliente" className="flex text-right mb-2">Nome</Label>
                                <Input id="cliente" placeholder="Inseira o nome" className="col-span-3" />
                            </div>
                            <div>
                                <Label htmlFor="cliente" className="flex text-right mb-2">Sobrenome</Label>
                                <Input id="cliente" placeholder="Inseira o sobrenome" className="col-span-3" />
                            </div>
                            <div>
                                <Label htmlFor="cliente" className="flex text-right mb-2">Telefone</Label>
                                <Input id="cliente" placeholder="Inseira o telefone" className="col-span-3" />
                            </div>
                            <div>
                                <Label htmlFor="cliente" className="flex text-right mb-2">Email</Label>
                                <Input id="email" type='email' placeholder="Inseira o email" className="col-span-3" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <div className='flex justify-between w-full items-center mt-10'>
                            <div>
                                <Label>Total: </Label>
                                <span>R$ 0,00</span>
                            </div>
                            <div className='flex gap-2'>
                                <Button type="submit">Reservar</Button>
                                <Button variant="outline" onClick={onClose}>Voltar</Button>
                            </div>
                        </div>
                    </DialogFooter>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={10} className='p-5 max-w-[55%] min-w-[25%]'>
                    Eventos
                </ResizablePanel>
            </ResizablePanelGroup>
        </DialogContent >
    );
}

export default Evento;
