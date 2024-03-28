import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogPortal, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface EventoProps {
    date: Date;
    onClose: () => void;
}

const FormSchema = z.object({
    dob: z.date({
        required_error: "A Data do evento é obrigatória!",
    }),
})

const Evento = ({ date , onClose}: EventoProps) => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    return (
            <DialogContent onInteractOutside={(evento) => evento.preventDefault()} onCloseAutoFocus={() => onClose()} className="sm:max-w-[60%] h-[65%]">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel className='p-5 w-max max-w-[75%] min-w-[45%]'>
                        <DialogHeader>
                            <DialogTitle>Cadastro</DialogTitle>
                            <DialogDescription>
                                Cadastre eventos para o dia {format(date, 'dd/MM/yyyy', { locale: pt })}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-4 align-middle py-5">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="cliente" className="text-right">
                                    Cliente
                                </Label>
                                <Input id="cliente" value="Inseira um nome" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="local" className="text-right">
                                    Local
                                </Label>
                                <Input id="local" value="Insira um local" className="col-span-3" />
                            </div>
                            <div className="flex flex-row items-center gap-4 justify-end">
                                <Label htmlFor="dia" className="text-right">
                                    Dia
                                </Label>
                                <Form {...form} >
                                    <form className="flex ">
                                        <FormField
                                            control={form.control}
                                            name="dob"
                                            defaultValue={date}
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
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </form>
                                </Form>
                                <Label htmlFor="inicio" className="text-right">
                                    Início
                                </Label>
                                <Input id="inicio" type="time" value="00:00" className="w-[12%]" />
                                <Label htmlFor="fim" className="text-right">
                                    Fim
                                </Label>
                                <Input id="fim" type="time" value="00:00" className="w-[12%]" />
                            </div>
                        </div>
                        <DialogFooter className='py-10'>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={10} className='p-5 max-w-[55%] min-w-[25%]'>
                        Eventos
                    </ResizablePanel>
                </ResizablePanelGroup>
            </DialogContent>
    );
}

export default Evento;
