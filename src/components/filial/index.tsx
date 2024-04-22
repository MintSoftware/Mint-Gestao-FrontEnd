import React, { useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { ChevronsUpDown, Check } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { Filial } from "@/types/Filial"
import { useAuth } from "@/hooks/useAuth"

const filiais: Filial[] = localStorage.getItem('@filial') ? JSON.parse(localStorage.getItem('@filial') as string) : [];

export const ComboBoxFilial = () => {


    const [open, setOpen] = React.useState(false)
    const { filialSelecionada, alterarFilialSelecionada } = useAuth();


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {filialSelecionada?.nomefantasia}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandGroup>
                        {filiais.map((filial) => (
                            <Button
                              key={filial.id}
                              onClick={() => alterarFilialSelecionada(filial)}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        filialSelecionada === filial ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {filial.nomefantasia}
                            </Button>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}