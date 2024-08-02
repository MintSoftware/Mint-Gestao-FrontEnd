import { cn } from "@/style/lib/utils"
import { Filial } from "@/types/Filial"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { Check } from "lucide-react"
import React from "react"
import { Button } from "../ui/button"
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

const filiais: Filial[] = localStorage.getItem('@filial') ? JSON.parse(localStorage.getItem('@filial') as string) : [];

export const ComboBoxFilial = () => {


    const [open, setOpen] = React.useState(false)
    //const { filialSelecionada, alterarFilialSelecionada } = useAuth();


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[250px] justify-center"
                >
                    {/*filialSelecionada?.nomefantasia*/}
                    <ChevronDownIcon className='m-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200' style={{
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                    }} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
                <Command>
                    <CommandInput placeholder="Procure pela filial..." />
                    <CommandGroup>
                        {filiais.map((filial) => (
                            <CommandList
                                key={filial.id}
                                /*onClick={() => alterarFilialSelecionada(filial)}*/
                                className="flex cursor-pointer w-[250px]"
                            >
                                <CommandItem className="flex w-[250px] bg-background">
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            /*filialSelecionada === filial ? "opacity-100" : "opacity-0"*/
                                        )}
                                    />
                                    {filial.nomefantasia}
                                </CommandItem>
                            </CommandList>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}