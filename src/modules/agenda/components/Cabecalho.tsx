import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAgendaContext } from "@/providers/AgendaProvider";
import { CalendarIcon, CheckIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, FilterIcon, RefreshCwIcon } from "lucide-react";

export function CabecalhoAgenda() {

    const {
        currentDate,
        handleToday,
        handleNextMonth,
        handlePreviousMonth,
        openFiltroLocal,
        setOpenFiltroLocal,
        handleLocalSelecionadoFiltro,
        localSelecionadoFiltro,
        locais,
        buscarLocais,
        loadingLocais,
        buscarEventos
    } = useAgendaContext();

    return (
        <div className="sticky mt-8 top-0 z-20 flex h-16 w-full items-center justify-between bg-background border rounded-[20px] px-4 shadow-sm sm:px-6">
            <div className="flex gap-5 items-center">
                <div>
                    <Button variant="ghost" size="icon" onClick={handleToday}>
                        <CalendarIcon className="h-5 w-5" />
                        <span className="sr-only">Hoje</span>
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <div>
                        <Popover open={openFiltroLocal} onOpenChange={setOpenFiltroLocal}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="ghost"
                                    role="combobox"
                                    aria-expanded={openFiltroLocal}
                                    className="w-[20rem] justify-between p-5 border"
                                    onClick={() => buscarLocais()}
                                >
                                    <FilterIcon className="h-5 w-5" />
                                    <Label className="text-muted-foreground">
                                        {localSelecionadoFiltro?.nome
                                            ? locais?.find((local) => local.id === localSelecionadoFiltro.id)?.nome
                                            : "Selecione um local"}
                                    </Label>
                                    <ChevronDownIcon className='m-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200' style={{
                                        transform: openFiltroLocal ? 'rotate(180deg)' : 'rotate(0deg)',
                                    }} />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[20rem] p-0">
                                <Command>
                                    {(loadingLocais) ? <></> :
                                        <div>
                                            <CommandInput placeholder="Busque o local aqui..." />
                                            <CommandEmpty>
                                                <Label>Local não encontrado</Label>
                                            </CommandEmpty>
                                        </div>
                                    }
                                    <CommandGroup>
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
                                                    onClick={() => handleLocalSelecionadoFiltro(local)}
                                                    className="flex cursor-pointer w-[20rem] bg-background hover:bg-muted/50"
                                                >
                                                    <CommandItem className="flex w-[20rem] bg-background">
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
                        <Button className="ml-2 items-center justify-center" variant="ghost" onClick={() => {
                            if (localSelecionadoFiltro) buscarEventos(localSelecionadoFiltro.id)
                        }}>
                            <RefreshCwIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="absolute left-[40vw] flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
                    <ChevronLeftIcon className="h-5 w-5" />
                    <span className="sr-only">Anterior</span>
                </Button>
                <div className="text-lg font-medium w-[9rem] flex justify-center">
                    {currentDate.toLocaleString("default", { month: "long" }).charAt(0).toUpperCase() + currentDate.toLocaleString("default", { month: "long" }).slice(1)} {currentDate.getFullYear()}
                </div>
                <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                    <ChevronRightIcon className="h-5 w-5" />
                    <span className="sr-only">Próximo</span>
                </Button>
            </div>
            <div className="flex gap-2">
                <DialogTrigger asChild>
                    <Button variant="ghost">Novo Evento</Button>
                </DialogTrigger>
            </div>
        </div>
    )
}